
import requests
import json
from dotenv import load_dotenv
import os
# import torch
# from transformers import PegasusForConditionalGeneration, PegasusTokenizer

# model_name = 'tuner007/pegasus_paraphrase'
# torch_device = 'cuda' if torch.cuda.is_available() else 'cpu'
# tokenizer = PegasusTokenizer.from_pretrained(model_name)
# model = PegasusForConditionalGeneration.from_pretrained(model_name).to(torch_device)

# def get_response(input_text,num_return_sequences,num_beams):
#   batch = tokenizer([input_text],truncation=True,padding='longest',max_length=60, return_tensors="pt").to(torch_device)
#   translated = model.generate(**batch,max_length=60,num_beams=num_beams, num_return_sequences=num_return_sequences, temperature=1.5)
#   tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)
#   return tgt_text

# num_beams = 1
# num_return_sequences = 1

import openai

load_dotenv()

openai.api_key = os.getenv("API_KEY")

def chatResponse(articleContent):
    # print(articleContent)
    completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a news reporter."}, 
        {"role": "user", "content": "Rewrite the following article for a newspaper: " + articleContent }
    ],
    temperature=0.1
    )
    # print(completion.choices[0].message.content)
    return completion.choices[0].message.content


articles = requests.get('http://localhost:3002/article.getAll').text
parse_json = json.loads(articles)
data = parse_json['data']


# for article in data:
#     for i in range(len(article['body'])):
#         article['body'][i] = "changed"
#     for attribute, value in article.items():
#         print(attribute, value)

first_article = data[0]

# Pegasus -------------------------------------------------

# for i in range(len(first_article['body'])):
#     first_article['body'][i] = get_response(article['body'][i],num_return_sequences,num_beams)

 # --------------------------------------------------------

# GPT------------------------------------------------------
articleReWrite = "\n".join(first_article["body"])
print ("___________ORGINAL__________________________________________________")
print(first_article["body"])
first_article["body"] = chatResponse(articleReWrite)
# ---------------------------------------------------------
print ("___________NEW______________________________________________________")
print (first_article["body"])

