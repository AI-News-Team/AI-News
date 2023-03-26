import json
import requests
import os

class PipelineCNN:
    def __init__(self):
        self.url = 'http://localhost:3000/article.create'
    
    def process_item(self, item, spider):

        output_file_path = 'spiders/cnn_output.json'
        
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

        return item