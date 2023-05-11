import json
import requests
from itemadapter import ItemAdapter
from dotenv import load_dotenv
import os
from requests.exceptions import RequestException

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

