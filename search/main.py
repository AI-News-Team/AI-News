from sentence_transformers import SentenceTransformer, util
from flask import Flask, request
from flask_restful import Resource, Api
from typing import Generator 
from dotenv import load_dotenv
import requests
import os

load_dotenv()

SERVER_PORT = os.getenv('SERVER_PORT')
if not SERVER_PORT: 
  raise Exception('SERVER_PORT environment variable not found')

TRANSFORMER =  'all-MiniLM-L6-v2'
SEARCH_DOMAIN = f'http://localhost:{SERVER_PORT}/article.search.domain'
SUCCESS = 200
NOT_FOUND = 404
BAD_REQUEST = 400

class Domain():
  def __init__(self, url: str):
    self.url = url
    self.searcher = None

  def fetch(self) -> dict:
    try:
      response = requests.get(self.url)
      code = response.status_code
    except requests.exceptions.ConnectionError:
      raise Exception('Could not connect to the server')
    except Exception as e:
      raise Exception(f'An unexpected error occurred: {e}')
    
    if code == NOT_FOUND:
      raise Exception('The requested resource was not found')

    json = response.json()
    error = None

    if code == SUCCESS:
      self.articles = json['data']

      # construct a searcher for the articles names
      names = [article['name'] for article in self.articles]
      self.searcher = SemanticSearch(names)
    else:
      error = json['error']

    return error

  def getArticles(self) -> list[dict]:
    return self.articles

  def search(self, query: str) -> Generator[str, None, None]:
    if self.searcher is None: 
      raise Exception('No search domain has been constructed')

    results = self.searcher.search(query)
    for idx in results:
      article = self.articles[idx]
      yield article

class SemanticSearch():
  def __init__(self, corpus: list[str]):
    self.embedder = SentenceTransformer(TRANSFORMER)
    self.corpus_embeddings = self.encodeAsTensor(corpus)
    self.corpus = corpus

  def encodeAsTensor(self, query: str) -> any:
    embedding = self.embedder.encode(query, convert_to_tensor=True)
    return embedding

  def search(self, query) -> Generator[int, None, None]:
    query_embedding = self.encodeAsTensor(query)
    scoredResults = util.semantic_search(query_embedding, self.corpus_embeddings)[0]
    for scoredResult in scoredResults:
      cid = scoredResult["corpus_id"]
      yield cid

# initialize flask
app = Flask(__name__)
api = Api(app)

# initialize articles
domain = Domain(SEARCH_DOMAIN)
error = domain.fetch()
if error:
  raise Exception(f'Error fetching articles: [{error["type"]}] {error["message"]}')

# Define resource
class SearchEngine(Resource):
  def get(self, query: str) -> list[str]: # todo: replace with `post`
    results = [r for r in domain.search(query)] # todo: stream results from generator?
    return results

api.add_resource(SearchEngine, "/search/<query>")

def main() -> None:
  while True:
    query = input('Enter a query: ')
    results = [r for r in domain.search(query)]
    print(results)

if __name__ == '__main__':
  main()