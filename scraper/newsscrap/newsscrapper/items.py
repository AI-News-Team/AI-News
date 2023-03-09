import scrapy
from scrapy.item import Item, Field


class Article(scrapy.Item):
    name = scrapy.Field()
    author = scrapy.Field()
    source_url = scrapy.Field()


