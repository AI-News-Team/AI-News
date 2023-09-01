import ast
import os
from typing import Generator, List

import numpy
import requests
import torch
from dotenv import load_dotenv
from flask import Flask, request
from flask_restful import Api, Resource
from sentence_transformers import SentenceTransformer, util
from sentence_transformers.cross_encoder import CrossEncoder

dot = os.path.dirname(os.path.realpath(__file__))
load_dotenv(f"{dot}/../local.env") # todo: refactor this to check for containerized builds, in which case we should use the `virtual.env` file

API_PORT = os.getenv('API_PORT')
if not API_PORT: 
  raise Exception('API_PORT environment variable not found')
API_HOST = os.getenv('API_HOST')
if not API_HOST:
  raise Exception('API_HOST environment variable not found')

SUCCESS = 200
NOT_FOUND = 404
BAD_REQUEST = 400

CROSS_ENCODER_MODEL = 'cross-encoder/stsb-distilroberta-base'
SENTENCE_TRANSFORMER_MODEL =  'all-MiniLM-L6-v2'

SEARCH_DOMAIN = f'http://{API_HOST}:{API_PORT}/article.search.domain'


'''
Encodes and stores a list of strings as a tensor providing semantic search functionality.
- SemanticSearch::encodeAsTensor(query) - encodes a query as a tensor
- SemanticSearch::search(query) - yields the indices of the articles that match the query
'''
class SemanticSearch:
    # Initialize the SemanticSearch class with a corpus.
    def __init__(self):
        self.embedded_names = []
        self.embedder = SentenceTransformer(SENTENCE_TRANSFORMER_MODEL)

    def fetch(self) -> dict:
      try:
        print(f'attempting to fetch data from {SEARCH_DOMAIN}...')
        response = requests.get(SEARCH_DOMAIN)
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
        self.embedded_names = [torch.Tensor(ast.literal_eval(article['embbeded_name'])) for article in self.articles]
      else:
        error = json['error']

      return error

    # Encode a query into its embedding representation.
    def encode_as_tensor(self, query: str) -> any:
        embedding = self.embedder.encode(query, convert_to_tensor=True)
        return embedding

    # Perform a semantic search using the given query.
    def search(self, query: str) -> Generator[any, None, None]:
        if not query:
            return  # Empty query, no search

        self.fetch()
        if not self.embedded_names:
          return  # No data, no search

        query_embedding = self.encode_as_tensor(query)
        scored_results = util.semantic_search(query_embedding, self.embedded_names)[0]

        for scored_result in scored_results:
          corpus_id = scored_result["corpus_id"]
          yield self.articles[corpus_id]

'''
Ranks a list of results based on their semantic similarity to the query.
- ResultRanker::rank(query, results) - returns a list of results ordered by their similarity to the query
'''
class ResultRanker:
  def __init__(self):
    self.model = CrossEncoder(CROSS_ENCODER_MODEL);

  def rank(self, query: str, results: List[dict]) -> List:
    if not results: raise Exception('No results to rank')
    if not query: return results 

    corpus = [article['name'] for article in results] # reduce article names
    combinations = [[query, c] for c in corpus] # pair the names with the query
    scores = self.model.predict(combinations) # cross-embed these pairs to get similarity scores

    # order the results by the score
    rankings = reversed(numpy.argsort(scores)) # argsort returns the indices of the sorted array
    ranked = [results[i] | { 'score' : scores[i] } for i in rankings]

    return ranked

# initialize models
search = SemanticSearch()
ranker = ResultRanker();

# initialize flask
app = Flask(__name__)
api = Api(app)

'''
Search API resource
GET `http://<domain>:<port>/search/<query> - returns a list of articles that match the query
'''
class SearchEngine(Resource):
  def get(self, query: str) -> list[str]: # todo: replace with `post`
    results = [r for r in search.search(query)]
    ranked = ranker.rank(query, results)
    results = [{"name": r["name"], "id": r["id"], "score": str(r["score"])} for r in ranked] 
    return results, SUCCESS, {'Access-Control-Allow-Origin': '*'}

api.add_resource(SearchEngine, "/search/<query>")
