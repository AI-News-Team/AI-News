from sentence_transformers import SentenceTransformer, util
import requests
from typing import Generator 

CATEGORY = 'gardening'
URL = f'http://localhost:3001/article.list/{CATEGORY}'

SUCCESS = 200
NOT_FOUND = 404
BAD_REQUEST = 400

class Articles():
  def __init__(self, url: str):
    self.url = url
    self.searcher = None

  def fetch(self) -> [int, dict]:
    response = requests.get(self.url)
    code = response.status_code
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
    for result in results:
      yield result

class SemanticSearch():
  def __init__(self, corpus: list[str]):
    self.embedder = SentenceTransformer('all-MiniLM-L6-v2')
    self.corpus_embeddings = self.encodeAsTensor(corpus)
    self.corpus = corpus

  def encodeAsTensor(self, query: str) -> any:
    embedding = self.embedder.encode(query, convert_to_tensor=True)
    return embedding

  def search(self, query) -> Generator[str, None, None]:
    query_embedding = self.encodeAsTensor(query)
    scoredResults = util.semantic_search(query_embedding, self.corpus_embeddings)[0]
    for scoredResult in scoredResults:
      result = self.corpus[scoredResult["corpus_id"]]
      yield result

def main() -> None:
  articles = Articles(URL)
  error = articles.fetch()
  if error:
    raise Exception(f'Error fetching articles: [{error["type"]}] {error["message"]}')

  while True: 
    query = input('search: ') # i.e. "climate change"
    for result in articles.search(query):
      print('- ', result)

if __name__ == '__main__':
  main()