import scrapy
from scrapy.item import Item, Field


class Article(scrapy.Item):
    name = scrapy.Field()
    author = scrapy.Field()
    publication_date = scrapy.Field()
    body = scrapy.Field()
    category = scrapy.Field()
    source_url = scrapy.Field()
    cover_url = scrapy.Field()
