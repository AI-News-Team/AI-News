# ReWriter

Paraphrases articles

## Environment

This module relies on the environment configured for the `api` module. Make sure the `api` module is running before starting the reWriter module.

Configure and run the `scraper` module to populate the database with articles to be rewritten.

## Dependencies

`pip install -r requirements.txt`

## Execution

`python reWriter.py`

Fetch raw articles from the `api` with `article.getAll` and paraphrased articles with `article.list/:category`.
