import scrapy


class News(scrapy.Item):
    news_url = scrapy.Field()
