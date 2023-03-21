import requests
import json

url = 'http://localhost:3000/article.create'

with open('spiders/articles_output.json', encoding="utf8") as f:
   data = json.load(f)
   requests.post(url, json = {"articles": data}, headers={'Content-Type': 'application/json'})