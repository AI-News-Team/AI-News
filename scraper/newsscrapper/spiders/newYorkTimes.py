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

class newYorkTimesSpider(scrapy.Spider):
    name = "newYorkTimes"
    allowed_domains = ['nytimes.com']
    start_urls = ['https://www.nytimes.com/international/']
    category = None

    def parse(self, response):
        for categories in response.xpath('//li[@data-testid="mini-nav-item"]//a/@href').getall():
            url = response.urljoin(str(categories))
            yield scrapy.Request(url, callback = self.getCategory, meta={'categories': categories})
            

    def getCategory(self, response):
        for href in response.xpath('//div[@class="css-4svvz1 eb97p610"]//a[contains(@data-rref, "")]/@href').getall():
            url = response.urljoin(href)
            yield scrapy.Request(url, callback = self.getArticle)
    
    def getArticle(self, response):
        item = Article()

        slug = response.url.split('/')[-3]
        if slug.isdigit():
            item["category"] = response.url.split('/')[-2]
        else:
            item["category"] = slug

        if item["category"] == "www.nytimes.com":
            return

        item['name'] = response.xpath('//h1[@data-testid="headline"]/text()').get()

        if response.xpath('//span[@class="g-name"]'):
            item['author'] = response.xpath('//span[@class="g-name"]/text()').get()

        item['author'] = response.xpath('//span[@itemprop="name"]/a/text()').get() or "New York Times"

        if response.xpath('//div[@class="g-date"]'):
            item['publication_date'] = response.xpath('//div[@class="g-date"]/text()').get()
        
        item['publication_date'] = response.xpath('//time/@datetime').get()

        if response.xpath('//p[@class="g-body "]'):
            item['body'] = response.xpath('//p[@class="g-body "]/text()').getall()

        if response.xpath('//div[@data-testid="document-block-body"]'):
            item['body'] = response.xpath('//div[@data-testid="document-block-body"]/p[position() < last()]//text()').getall()

        item['body'] = response.xpath('//section[@name="articleBody"]/div/div//p/text()').getall()

        item['source_url'] = response.url

        if response.xpath('//div[@class="g-asset_inner"]/picture/img'):
            item['cover_url'] = response.xpath('//div[@class="g-asset_inner"]/picture/img/@src').get()

        if response.xpath('//header[@data-testid="title-byline"]/figure/div/div/picture[@class=""]'):
            item['cover_url'] = response.xpath('//header[@data-testid="title-byline"]/figure/div[@data-testid="image-holder"]/div/picture/img/@src').get()

        item['cover_url'] = response.xpath('//picture/img/@srcset').get()
        
        yield item
