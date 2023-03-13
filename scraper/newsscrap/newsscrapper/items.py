import scrapy
from scrapy.item import Item, Field


class Article(scrapy.Item):
    name = scrapy.Field()
    author = scrapy.Field()
    date = scrapy.Field()
    category = scrapy.Field()
    body = scrapy.Field()
    source_url = scrapy.Field()
    cover_url = scrapy.Field()


