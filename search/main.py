import os
from typing import Generator

import requests
from dotenv import load_dotenv
from flask import Flask, request
from flask_restful import Api, Resource
from sentence_transformers import SentenceTransformer, util

dot = os.path.dirname(os.path.realpath(__file__))
load_dotenv(f"{dot}/../local.env") # todo: refactor this to check for containerized builds, in which case we should use the `virtual.env` file

API_PORT = os.getenv('API_PORT')
if not API_PORT: 
  raise Exception('API_PORT environment variable not found')
API_HOST = os.getenv('API_HOST')
if not API_HOST:
  raise Exception('API_HOST environment variable not found')


TRANSFORMER =  'all-MiniLM-L6-v2'
SEARCH_DOMAIN = f'http://{API_HOST}:{API_PORT}/article.search.domain'
SUCCESS = 200
NOT_FOUND = 404
BAD_REQUEST = 400

'''
Encodes and stores a list of strings as a tensor providing semantic search functionality.
- SemanticSearch::encodeAsTensor(query) - encodes a query as a tensor
- SemanticSearch::search(query) - yields the indices of the articles that match the query
'''
class SemanticSearch():
  def __init__(self, corpus: list[str]):
    self.embedder = SentenceTransformer(TRANSFORMER)
    self.corpus_embeddings = [] if len(corpus) == 0 else self.encodeAsTensor(corpus)  # Torch throws an error if the corpus is empty, use empty list if so
    self.corpus = corpus

  def encodeAsTensor(self, query: str) -> any:
    embedding = self.embedder.encode(query, convert_to_tensor=True)
    return embedding

  def search(self, query) -> Generator[int, None, None]:
    if len(self.corpus) == 0: return [] # no data, no search
    query_embedding = self.encodeAsTensor(query)
    scoredResults = util.semantic_search(query_embedding, self.corpus_embeddings)[0]
    for scoredResult in scoredResults:
      cid = scoredResult["corpus_id"]
      yield cid

'''
Fetches and stores collection of articles providing methods to fetch and search
- Domain::fetch() - fetches the articles from the server
- Domain::getArticles() - returns the articles
- Domain::search(query) - yields articles that match the query
'''
class Domain():
  def __init__(self, url: str):
    self.url = url
    self.searcher = None

  def fetch(self) -> dict:
    try:
      print(f'attempting to fetch data from {SEARCH_DOMAIN}...')
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

# initialize flask
app = Flask(__name__)
api = Api(app)

# initialize articles
domain = Domain(SEARCH_DOMAIN)
error = domain.fetch()
if error:
  raise Exception(f'Error fetching articles: [{error["type"]}] {error["message"]}')

'''
Search API resource
GET `http://<domain>:<port>/search/<query> - returns a list of articles that match the query
`pip install -r requirements.txt && ./init`
'''
class SearchEngine(Resource):
  def get(self, query: str) -> list[str]: # todo: replace with `post`
    results = [r for r in domain.search(query)] # todo: stream results from generator?
    return results#, SUCCESS, {'Access-Control-Allow-Origin': '*'}

api.add_resource(SearchEngine, "/search/<query>")

'''
Command Line Execution
`pip install -r requirements.txt && python main.py`
'''
def main() -> None:
  while True:
    query = input('Enter a query: ')
    results = [r for r in domain.search(query)]
    print(results)

if __name__ == '__main__':
  main()