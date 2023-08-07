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


# Select reWriter model by updating REWRITER_MODEL variable to one of the following:
#     "pegasus" = tuner007/pegasus_paraphrase
#     "t5_base" = google/flan-t5-base


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

  translated = model.generate(**batch,
                            max_length=60,
                            num_beams=num_beams,
                            temperature=1.5,
                            num_return_sequences=num_return_sequences)
  
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
                input_text="paraphrase: " + article['body'][i] + " </s>"
                #re-writing article sentence
                article['body'][i] = get_response(input_text,num_return_sequences,num_beams)[0]

        return article
    
    except RequestException as e:
        print(f"Error rewriting article {article['id']}", e)    


def t5_single_sentence_reWriter(article):
    try:
        print(f"processing {article['id']}")
        print(f"{len(article['body'])} lines")

        print(f"processing article {article['id']}......")

        for i in range(len(article['body'])):
            print(len(article['body']) - i)
            # removing empty sentences
            if article['body'][i] == '':
                del article['body'][i]
            else:
                input_text=article['body'][i]
                #re-writing article sentence
                input_ids = tokenizer(input_text, return_tensors="pt").input_ids
            
                outputs = model.generate(input_ids, 
                                max_new_tokens=40,
                                do_sample=True,
                                top_k=50,
                                top_p=0.95,
                                num_return_sequences=1)
                article['body'][i] = tokenizer.decode(outputs[0], skip_special_tokens=True,clean_up_tokenization_spaces=True)

        print(article)
        return article
    
    except RequestException as e:
        print(f"Error rewriting article {article['id']}", e)


# ------------T5-BASE REWRITER FUNCTION-----------------

def t5_base_reWriter(article):
    try:
        print(f"processing {article['id']}")
        print(f"{len(article['body'])} lines")

        # Split article into smaller chunks for rewriting
        # split_article = [article['body'][i:i + 10] for i in range(0, len(article['body']), 10)]

        # print(split_article)

        # reWrittenArticle = []

        # print(f"processing article {article['id']}......")

        # for article_portion in split_article:
        #     joint_article_portion = ' '.join(article_portion)
        #     input_text = f"rewrite the following text:\n\n{joint_article_portion}"
        #     # get min length of returned article
        #     wordCount = len(input_text.split()) 
        #     # round down to nearest hundred
        #     wordCount = math.floor(wordCount / 100) * 100
        #     input_ids = tokenizer(input_text, return_tensors="pt").input_ids
            
        #     outputs = model.generate(input_ids, 
        #                         min_length=wordCount,
        #                         max_length=wordCount+100,
        #                         length_penalty=2,
        #                         num_beams=4,
        #                         no_repeat_ngram_size=3)
        #     reWritten_portion = tokenizer.decode(outputs[0])

        #     split_article_portion = [x+"." for x in reWritten_portion.split(".") if x]
        #     print("rewritten article portion")
        #     print(split_article_portion)
        #     reWrittenArticle.extend(split_article_portion)

        # print(reWrittenArticle)
        # article['body'] = reWrittenArticle



        jointArticle = ' '.join(article['body'])
        input_text = f"rewrite the following text:\n\n{jointArticle}"
        # input_text = f"paraphrase: {jointArticle} </s>"
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
                            # do_sample=True,
                            # top_k=120,
                            # top_p=0.95,
                            temperature=0.6,
                            early_stopping=True,
                            num_beams=5,
                            no_repeat_ngram_size=3)
        reWrittenArticle = tokenizer.decode(outputs[0])
        article['body'] = reWrittenArticle.split(".")
        print(article['body'])

    #     return article
    
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
        article = t5_single_sentence_reWriter(article)

    print (article)
    print(f"sending {article['id']}")
    # send_article(article)

sys.exit("exiting")
