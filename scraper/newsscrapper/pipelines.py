import json
import requests
import os
from scrapy import Spider
from itemadapter import ItemAdapter

class NewsscrapperPipeline:
    def __init__(self):
        self.url = 'http://localhost:3000/article.create'
    
    def process_item(self, item, spider):
        return item
    
    def closed_spider(self, spider):
        output_file_path = spider.settings.get('OUTPUT_FILE')
        
        with open(output_file_path, encoding="utf8") as f:
            data = json.load(f)
            response = requests.post(
                self.url, json = {"articles": data}, 
                headers={'Content-Type': 'application/json'}
            )
        
        if response.status_code != 200:
            raise Exception('Failed to send data: {response.text}')
        
        if response.status_code == 200:
            print('Data sent successfully')

            if os.path.exists(output_file_path):
                os.remove(output_file_path)
            else:
                print(f'File "{output_file_path}" does not exist.')