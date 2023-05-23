
import requests
import json
articles = requests.get('http://localhost:3002/article.get/1').text
parse_json = json.loads(articles)
data = parse_json['data']['body']
print(data)

