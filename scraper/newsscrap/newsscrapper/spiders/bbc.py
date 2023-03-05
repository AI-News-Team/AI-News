import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.item import Item, Field
from newsscrapper.items import News
#
#  cd to spiders
#  scrapy crawl bbc (to run spider)
# 
class BbcSpider(scrapy.Spider):
    name = "bbc"
    allowed_domains = ['bbc.com']
    start_urls = ['https://www.bbc.com']

    rules = (Rule(LinkExtractor(allow=('/news')), callback='parse', follow=True),)

    def parse(self, response):
        item = News()
        item ['news_url'] = response.url
