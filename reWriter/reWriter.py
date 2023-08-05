import json
import os
import sys
import math
import requests
import torch
from dotenv import load_dotenv
from requests.exceptions import RequestException
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
from transformers import T5Tokenizer, T5ForConditionalGeneration

'''
Select reWriter model by updating REWRITER_MODEL variable to one of the following:
    "pegasus" = tuner007/pegasus_paraphrase
    "t5_base" = google/flan-t5-base
''' 

REWRITER_MODEL="t5_base"

if REWRITER_MODEL != "pegasus" and REWRITER_MODEL != "t5_base":
    print("Please select a valid reWriter model")
    sys.exit("exiting")

dot = os.path.dirname(os.path.realpath(__file__))
load_dotenv(f"{dot}/../local.env") # todo: refactor this to check for containerized builds, in which case we should use the `virtual.env` file
API_PORT = os.getenv("API_PORT")
API_HOST = os.getenv("API_HOST")

URL = f'http://{API_HOST}:{API_PORT}/article.create'
getAllURL = f'http://{API_HOST}:{API_PORT}/article.getAll'

# Defining Pegasus ReWriter-------------------------------------------------

model_name = 'tuner007/pegasus_paraphrase'
torch_device = 'cuda' if torch.cuda.is_available() else 'cpu'
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name).to(torch_device)

def get_response(input_text,num_return_sequences,num_beams):
  batch = tokenizer([input_text],truncation=True,padding='longest',max_length=60, return_tensors="pt").to(torch_device)
  translated = model.generate(**batch,max_length=60,num_beams=num_beams, num_return_sequences=num_return_sequences, temperature=1.5)
  tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)
  return tgt_text

# Altering beams adjusts the number of words the rewriter looks ahead in a sentence that it is paraphrasing.
# Higher beams should mean better results, but longer processing time
num_beams = 5

## Number of paraphrased results returned per sentence
num_return_sequences = 1

# --------------------------------------------------------------------

# google/flan-t5-base rewriter -----------------------------------------

tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-base")
model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base")

# ------------PEGASUS REWRITER FUNCTION-----------------

def pegasus_reWriter(article):
    try:
        print(f"processing {article['id']}")
        print(f"{len(article['body'])} lines")

        for i in range(len(article['body'])):
            print(len(article['body']) - i)
            # removing empty sentences
            if article['body'][i] == '':
                del article['body'][i]
            else:
                #re-writing article sentence
                article['body'][i] = get_response(article['body'][i],num_return_sequences,num_beams)[0]

        return article
    
    except RequestException as e:
        print(f"Error rewriting article {article['id']}", e)    

# ------------T5-BASE REWRITER FUNCTION-----------------

def t5_base_reWriter(article):
    try:
        print(f"processing {article['id']}")
        print(f"{len(article['body'])} lines")

        jointArticle = ' '.join(article['body'])
        input_text = f"rewrite the following text:\n\n{jointArticle}"
        # get min length of returned article
        wordCount = len(input_text.split()) 
        # round down to nearest hundred
        wordCount = math.floor(wordCount / 100) * 100
        input_ids = tokenizer(input_text, return_tensors="pt").input_ids

    # --------------------------------------------------------------------

        print(f"processing article {article['id']}......")
        outputs = model.generate(input_ids, 
                            min_length=wordCount+100,
                            max_length=wordCount*2,
                            length_penalty=2,
                            num_beams=4,
                            no_repeat_ngram_size=3)
        reWrittenArticle = tokenizer.decode(outputs[0], skip_special_tokens=True)
        article['body'] = reWrittenArticle.split(".")
        print(article['body'])

        return article
    
    except RequestException as e:
        print(f"Error rewriting article {article['id']}", e)

def send_article(article):
    try: 
        response = requests.post(
        URL, json={"article": article}, 
        headers={'Content-Type': 'application/json'}
        )
        if response.status_code != 200:
            raise Exception(f'FAILED TO SEND DATA: {response.text}')
        if response.status_code == 200:
            print('DATA SENT SUCCESSFULLY !')
    except RequestException as e:
        print('Failed to connect to server: ', e)


# fetching articles to re-write
try: 
    data = requests.get(
        getAllURL
        ).text

except RequestException as e:
    print('Failed to connect to server: ', e)

print("loading data...")
articles = json.loads(data)

print("paraphrasing...")
for article in articles['data']:

    # formatting body if it isn't a list
    if isinstance(article['body'], str):
        article['body'] = article['body'].split(".")

    if REWRITER_MODEL == "pegasus":
        article = pegasus_reWriter(article)
    elif REWRITER_MODEL == "t5_base":
        article = t5_base_reWriter(article)

    print (article)
    print(f"sending {article['id']}")
    send_article(article)

sys.exit("exiting")
