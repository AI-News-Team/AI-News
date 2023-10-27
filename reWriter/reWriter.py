import json
import os
import sys

import requests
import torch
from dotenv import load_dotenv
from requests.exceptions import RequestException
from transformers import PegasusForConditionalGeneration, PegasusTokenizer

# Pegasus ReWriter-------------------------------------------------

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
num_beams = 10

## Number of paraphrased results returned per sentence
num_return_sequences = 1

# --------------------------------------------------------------------

dot = os.path.dirname(os.path.realpath(__file__))
load_dotenv(f"{dot}/../local.env") # todo: refactor this to check for containerized builds, in which case we should use the `virtual.env` file
API_PORT = os.getenv("API_PORT")
API_HOST = os.getenv("API_HOST")
TOKEN = os.getenv("REWRITER_TOKEN")

URL = f'http://{API_HOST}:{API_PORT}/article.create'
getAllURL = f'http://{API_HOST}:{API_PORT}/article.getAll'

def send_article(article):
    try: 
        response = requests.post(
        URL, json={"article": article}, 
        headers={'Content-Type': 'application/json', 'Authorization': f'{TOKEN}'}
        )
        if response.status_code != 200:
            raise Exception(f'FAILED TO SEND DATA: {response.text}')
        if response.status_code == 200:
            print('DATA SENT SUCCESSFULLY !')
    except RequestException as e:
        print('Failed to connect to server: ', e)

try: 
    data = requests.get(
        getAllURL
        ).text

except RequestException as e:
    print('Failed to connect to server: ', e)

# data = requests.get('http://{API_HOST}:{API_PORT}/article.getAll').text

print("loading data...")
articles = json.loads(data)

print("paraphrasing...")

for article in articles['data']:
    # formatting body if it isn't a list
    if isinstance(article['body'], str):
        article['body'] = article['body'].split(".")

    print(f"processing {article['id']}")
    print(f"{len(article['body'])} lines")

    for i in range(len(article['body'])):

        print(len(article['body']) - i)
        article['body'][i] = article['body'][i].rstrip()
        # removing empty sentences
        if article['body'][i] == '':
            del article['body'][i]
        else:
            # Checking for multiple sentences in article input
            if ". " in article['body'][i]:
                delimiter = ". "
                jointString = ""
                # split into multpile sentences
                splitString = article['body'][i].split(delimiter)
                for p in range(len(splitString)):
                    # rewrite each sentence
                    splitString[p] = get_response(splitString[p],num_return_sequences,num_beams)[0]
                    # combine rewritten sentences into full paragraph
                    jointString+=splitString[p]+" "
                article['body'][i] = jointString
            else:
                #re-writing article sentence
                article['body'][i] = get_response(article['body'][i],num_return_sequences,num_beams)[0]
                
    print(f"ReWriting article {article['id']} title")
    article['name'] = get_response(article['name'],num_return_sequences,num_beams)[0]

    send_article(article)

sys.exit("exiting")