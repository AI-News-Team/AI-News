import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.item import Item, Field
from newsscrapper.items import Article
from scrapy.loader.processors import TakeFirst, MapCompose
import re

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

    # Extracts all the links for the categories
    def parse(self, response):
        for categories in response.xpath('//h4[@class="nav-title"]/a/@href').getall():
            url = response.urljoin(str(categories))
            yield scrapy.Request(url, callback = self.getCategory, meta={'categories': categories})

    # Extracts all the links for the articles in the categories
    def getCategory(self, response):

        # iterate through all the categories
        for href in response.xpath('//div[@class="m"]/a/@href').getall():
            url = response.urljoin(href)
            yield scrapy.Request(url, callback = self.getArticle)

    # Extracts all the information from the article
    def getArticle(self, response):
        item = Article()
        
        item['name'] = response.xpath('//head/meta[@data-hid="dc.title"]/@content').get()

        item['author'] = response.xpath('//head/meta[@data-hid="dc.creator"]/@content').get() or 'Fox News'

        item['publication_date'] = response.xpath('//head/meta[@data-hid="dcterms.created"]/@content').get()
         
        body = response.xpath('//div[@class="article-body"]/p//text()').getall()

        for i in reversed(range(len(body))):
            body[i] = body[i].replace("\xa0", " ").strip()
            text = body[i]
            if (text.replace(" ", "").isupper()):
                del body[i]
            elif (text[len(text)-1] != "." and text[len(text)-1] != '"' and i+1 != len(body)):
                body[i] = text + " " + body[i+1]
                del body[i+1]

        item['body'] = body
            
        toFetchCategories = ['world', 'politics', 'entertainment', 'business', 'science']
        
        category = response.xpath('//head/meta[@data-hid="prism.section"]/@content').get()

        # Reassign category if it's not in the list of categories to fetch
        if category == 'lifestyle':
            category = 'entertainment'
        elif category == 'tech':
            category = 'science'
        elif category == 'tv':
            category = 'entertainment'
        elif category == 'us':
            category = 'world'

        # Get rids of the categories that do not exist in the db
        if category is None or category not in toFetchCategories:
            return None
        
        category = category.lower()
        item['category'] = category

        item['source_url'] = response.url

        # Get rid of the articles that do not have a cover image. Due to weird layouts, doesn't exract image properly
        item['cover_url'] = response.xpath('//head/meta[@data-hid="og:image"]/@content').get()
        if item['cover_url'] == "[object Object]":
            return None
        elif item['cover_url'] is None:
            return None
        
        # print (item)
        yield item

