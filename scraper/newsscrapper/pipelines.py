import json
import requests
from itemadapter import ItemAdapter

class NewsscrapperPipeline:
    def __init__(self):
        self.url = 'http://localhost:3000/article.create'
        self.json = []
    
    def process_item(self, item, spider):
        self.json.append(item)
        print (item)
        return item
    
    def close_spider(self, spider):     
        data = json.dumps(self.json, default = vars)
        f = open('testFile.json', 'x')
        f.write(data)

        response = requests.post(
            self.url, json = {
                "articles": json.dumps(self.json)
            }, 
            headers = {
            'Content-Type': 'application/json'
            }
        )

            
        if response.status_code != 200:
            raise Exception(f'FAILED TO SEND DATA: {response.text}')
        
        if response.status_code == 200:
            print('DATA SENT SUCCESSFULLY !')