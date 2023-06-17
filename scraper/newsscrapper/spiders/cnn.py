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
#   scrapy crawl cnn (to run spider)
#   scrapy shell "https://edition.cnn.com/world"
#

class CNNSpider(scrapy.Spider):
    name = "cnn"
    allowed_domains = ['edition.cnn.com']
    start_urls = ['https://edition.cnn.com/']

    # Extracts all the links for the categories
    def parse(self, response):
        for href in response.xpath('//div[@class="header__nav-item"]//a/@href'):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url, callback = self.getCategory)
        
    # Extracts all the links for the articles in the categories
    def getCategory(self, response):
        fetched_category = response.xpath('//head/meta[@name="meta-section"]/@content').get()

        # iterate through all the categories
        for href in response.xpath('//a[@class="container__link container_lead-plus-headlines__link"]/@href').getall():
            url = response.urljoin(href)

            # Checks if the category is in not in DB and if it is not, then returns None
            if fetched_category == 'video' or fetched_category == 'cnn-underscored':
                yield None
            else:             
                yield scrapy.Request(url, callback = self.getArticle)
                
    # Extracts all the information from the article
    def getArticle(self, response):
        item = Article()
        
        item['name'] = response.xpath('//head/meta[@property="og:title"]/@content').get()

        item['author'] = response.xpath('//head/meta[@name="author"]/@content').get() or 'cnn'

        item['publication_date'] = response.xpath('//head/meta[@property="article:published_time"]/@content').get()
                
        item['body'] = response.xpath('//div[@class="article__content"]/p//text()').getall()

        category = response.xpath('//head/meta[@name="meta-section"]/@content').get()

        # reassign category and get rids of unwanted categories
        if category == 'us':
            category = 'world'
        elif category == 'cnn-underscored':
            # do not return item
            return None 
        
        item['category'] = category
        
        item['source_url'] = response.url
        item['cover_url'] = response.xpath('//head/meta[@property="og:image"]/@content').get()

        # Checks for different layouts
        if response.xpath('//div[@class="gallery-inline__container"]'):
            item['body'] = response.xpath('//span[@class="inline-placeholder"]/text()').getall()
            # item['cover_url'] = response.xpath('//picture[@class="image_gallery-image__picture"]/img/@src').getall()
        
        if not item['body']:
            item['body'] = response.xpath('//head/meta[@name="description"]/@content').get()
        
        yield item
