import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.item import Item, Field
from newsscrapper.items import Article
from scrapy.loader.processors import TakeFirst, MapCompose

#   to install pytz module for converting time to UTC
#   pip install pytz
#
#   cd to spiders
#   scrapy crawl newYorkTimes (to run spider)
#   scrapy shell "https://www.nytimes.com/international/"
#

class foxNews(scrapy.Spider):
    name = "foxNews"
    allowed_domains = ['foxnews.com']
    start_urls = ['https://www.foxnews.com/']
    category = None

    def parse(self, response):
        for categories in response.xpath('//h4[@class="nav-title"]/a/@href').getall():
            url = response.urljoin(str(categories))
            yield scrapy.Request(url, callback = self.getCategory, meta={'categories': categories})
            
    def getCategory(self, response):
        for href in response.xpath('//div[@class="m"]/a/@href').getall():
            url = response.urljoin(href)
            yield scrapy.Request(url, callback = self.getArticle)
    
    def getArticle(self, response):
        item = Article()
        
        item['name'] = response.xpath('//head/meta[@data-hid="dc.title"]/@content').get()

        item['author'] = response.xpath('//head/meta[@data-hid="dc.creator"]/@content').get() or 'Fox News'

        item['publication_date'] = response.xpath('//head/meta[@data-hid="dcterms.created"]/@content').get()

        if response.xpath('//p[@class="speakable"]'):
            item['body'] = response.xpath('//p[@class="speakable"]//text()').getall()
        else:
            body = response.xpath('//p//text()').getall()
            body = body[10:]
            body = body[:-14]
            body = [item for item in body if "CLICK HERE TO GET THE FOX NEWS APP" not in item]
            item['body'] = body
            if len(body) == 0:
                return None
            
        toFetchCategories = ['us', 'world', 'politics', 'entertainment', 'business', 'science']
        
        category = response.xpath('//head/meta[@data-hid="prism.section"]/@content').get()

        # Reassign category if it's not in the list of categories to fetch
        if category == 'lifestyle':
            category = 'entertainment'
        elif category == 'tech':
            category = 'science'
        elif category == 'tv':
            category = 'entertainment'

        if category is None or category not in toFetchCategories:
            return None
        
        category = category.lower()
        item['category'] = category

        item['source_url'] = response.url

        item['cover_url'] = response.xpath('//head/meta[@data-hid="og:image"]/@content').get()
        if item['cover_url'] == "[object Object]":
            return None
        elif item['cover_url'] is None:
            return None
        
        yield item

