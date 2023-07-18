import json
import os
import sys

import requests
from dotenv import load_dotenv
from itemadapter import ItemAdapter
from requests.exceptions import RequestException

dot = os.path.dirname(os.path.realpath(__file__))
load_dotenv(dotenv_path=f"{dot}/../../local.env") # todo: refactor this to check for containerized builds, in which case we should use the `virtual.env` file
API_PORT = os.getenv("API_PORT")
API_HOST = os.getenv("API_HOST")

print(f"Scraping articles to send to {API_HOST}:{API_PORT}...")

class NewsscrapperPipeline:
    def __init__(self):
        # Link that sends the data to the API
        self.url = f'http://{API_HOST}:{API_PORT}/article.create_raw'
        self.json = []
    
    def process_item(self, item, spider):
        self.json.append(item)
        return item
     
    def close_spider(self, spider):
        def serialize_item(item):
            # Return a dictionary of the item's non-underscored attributes
            # Get rids of the "data" tag at the start of the array what fails sending data to the API
            return {k: v for k, v in item.items() if not k.startswith('_')}
        
        data = json.dumps(self.json, default=serialize_item)
        articles = json.loads(data)

        # For checking purposes if it formats scraped data correctly.
        # Outputs extracted data to a json file in spiders directory.
        # with open('articles.json', 'w') as f:
        #     json.dump(articles, f, indent=4)

        try: 
            response = requests.post(
            self.url, json={"articles": articles}, 
            headers={'Content-Type': 'application/json'}
            )

            if response.status_code == 200:
                print('DATA SENT SUCCESSFULLY !')
            else:
                raise Exception(f'FAILED TO SEND DATA: {response.text}')

        except RequestException as e:
            print('Failed to connect to server: ', e)

