import json
import requests
from itemadapter import ItemAdapter
from dotenv import load_dotenv
import os
from requests.exceptions import RequestException
import torch
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
model_name = 'tuner007/pegasus_paraphrase'
torch_device = 'cuda' if torch.cuda.is_available() else 'cpu'
tokenizer = PegasusTokenizer.from_pretrained(model_name)
model = PegasusForConditionalGeneration.from_pretrained(model_name).to(torch_device)

def get_response(input_text,num_return_sequences,num_beams):
  batch = tokenizer([input_text],truncation=True,padding='longest',max_length=60, return_tensors="pt").to(torch_device)
  translated = model.generate(**batch,max_length=60,num_beams=num_beams, num_return_sequences=num_return_sequences, temperature=1.5)
  tgt_text = tokenizer.batch_decode(translated, skip_special_tokens=True)
  return tgt_text
# import reWriter

num_beams = 1
num_return_sequences = 1

load_dotenv()
PORT_NUMBER = os.getenv("PORT_NUMBER")

class NewsscrapperPipeline:
    def __init__(self):
        self.url = f'http://localhost:{PORT_NUMBER}/article.create'
        self.json = []
    
    def process_item(self, item, spider):
        self.json.append(item)
        return item
    
     
    def close_spider(self, spider):
        def serialize_item(item):
            # Return a dictionary of the item's non-underscored attributes
            return {k: v for k, v in item.items() if not k.startswith('_')}
        
        print(self.json[0]["body"][1])

        for i in range(len(self.json[0]["body"])):
            self.json[0]["body"][i] = get_response(self.json[0]["body"][i],num_return_sequences,num_beams)
    
        # for article in self.json:
        #     for i in range(len(article['body'])):
        #         article['body'][i] = get_response(article['body'][i],num_return_sequences,num_beams)

        # print(self.json)
        
        data = json.dumps(self.json, default=serialize_item)
        articles = json.loads(data)

        # For checking purposes if it formats scraped data correctly
        # with open('articles.json', 'w') as f:
        #     json.dump(articles, f, indent=4)

        try: 
            response = requests.post(
            self.url, json={"articles": articles}, 
            headers={'Content-Type': 'application/json'}
            )

            if response.status_code != 200:
                raise Exception(f'FAILED TO SEND DATA: {response.text}')
            
            if response.status_code == 200:
                print('DATA SENT SUCCESSFULLY !')

        except RequestException as e:
            print('Failed to connect to server: ', e)

