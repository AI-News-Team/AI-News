import json
import os
import sys

import requests
import torch
from dotenv import load_dotenv
from requests.exceptions import RequestException
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
from transformers import T5Tokenizer, T5ForConditionalGeneration

# Pegasus ReWriter-------------------------------------------------

# model_name = 'tuner007/pegasus_paraphrase'
# torch_device = 'cuda' if torch.cuda.is_available() else 'cpu'
# tokenizer = PegasusTokenizer.from_pretrained(model_name)
# model = PegasusForConditionalGeneration.from_pretrained(model_name).to(torch_device)

# def get_response(input_text,num_return_sequences,num_beams):
#   batch = tokenizer([input_text],truncation=True,padding='longest',max_length=60, return_tensors="pt").to(torch_device)
#   translated = model.generate(**batch,max_length=60,num_beams=num_beams, num_return_sequences=num_return_sequences, temperature=1.5)
#   tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)
#   return tgt_text

# # Altering beams adjusts the number of words the rewriter looks ahead in a sentence that it is paraphrasing.
# # Higher beams should mean better results, but longer processing time
# num_beams = 5

# ## Number of paraphrased results returned per sentence
# num_return_sequences = 1

# --------------------------------------------------------------------

# google/flan-t5-base rewriter -----------------------------------------

tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-base")
model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base")

# input_text = 'rewrite the following article: A prolonged heatwave in the US has led to an uptick in severely burned patients who were injured after touching hot surfaces or objects.  Medics in Arizona said some patients were hurt after falling onto asphalt which had been heated by the sun.  The city of Phoenix has now seen a record-breaking 24 consecutive days of temperatures above 110F (43C).  Officials warn that ground temperatures can reach near-boiling, and warn people to seek shelter from the fiery heat.  Dr Kevin Foster of the Arizona Burn Centre tells BBC News that all of the centre\'s 45 hospital beds are currently occupied, and around one-third of those patients have suffered severe contact burns from scorching concrete and asphalt surfaces.  "Summertime is the busy time, so that\'s not surprising, but the numbers are a little bit higher than anticipated," he says, adding that the rate of new patients has outpaced 2022 so far this summer.  Many of the patients are elderly people, who may have fallen after becoming unsteady in the heat, or children who do not get off the ground quickly after falling.  However, he says the "biggest problem" is drug users who are often dehydrated and can faint on sidewalks.  "When people go down to a hot surface and stay there, it only takes 10 to 15 minutes to suffer heat exhaustion, burns and other problems," says Dr Foster, adding that some of the burns are deep, third-degree injuries that will require skin grafts.  The centre is also treating over 150 patients who have not been admitted to hospital, but need to be treated for burns sustained touching hot surfaces, such as metal car seat belts.  The inside of a car or the dark asphalt surface of a road can be far hotter than the air temperature, research has shown. Touching metal or asphalt for only a few seconds can be enough to cause severe burns.'
# input_ids = tokenizer(input_text, return_tensors="pt").input_ids

# --------------------------------------------------------------------

# outputs = model.generate(input_ids, 
#                          min_length=10,
#                          max_length=20,
#                          length_penalty=2,
#                          no_repeat_ngram_size=2)
# print(tokenizer.decode(outputs[0]))

dot = os.path.dirname(os.path.realpath(__file__))
load_dotenv(f"{dot}/../local.env") # todo: refactor this to check for containerized builds, in which case we should use the `virtual.env` file
API_PORT = os.getenv("API_PORT")
API_HOST = os.getenv("API_HOST")

URL = f'http://{API_HOST}:{API_PORT}/article.create'
getAllURL = f'http://{API_HOST}:{API_PORT}/article.getAll'

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

    print(article)

    input_text = f"rewrite the following text:\n\n{' '.join(article['body'])}"
    input_ids = tokenizer(input_text, return_tensors="pt").input_ids

# --------------------------------------------------------------------

    print(f"processing {article['id']}......")
    outputs = model.generate(input_ids, 
                         min_length=500,
                         max_length=5000,
                         length_penalty=2,
                         num_beams=2,
                         no_repeat_ngram_size=2)
    article['body'] = tokenizer.decode(outputs[0])

    # formatting body if it isn't a list
    # if isinstance(article['body'], str):
    #     article['body'] = article['body'].split(".")

    # print(f"processing {article['id']}")
    # print(f"{len(article['body'])} lines")

    # for i in range(len(article['body'])):
    #     # print(len(article['body']) - i)
    #     # removing empty sentences
    #     if article['body'][i] == '':
    #         del article['body'][i]
    #     else:
    #         #re-writing article sentence
    #         # article['body'][i] = get_response(article['body'][i],num_return_sequences,num_beams)[0]
    #         print("here")
    print(f"sending {article['id']}")
    send_article(article)

sys.exit("exiting")
