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

    def parse(self, response):
        item = Article()

        for categories in response.xpath('//li[@data-testid="mini-nav-item"]//a/@href'):
            url = response.urljoin(str(categories))
            item["category"] = categories.split('/')[-1]
            for href in response.xpath('//div[@class="css-4svvz1 eb97p610"]//a[contains(@data-rref, "")]/@href').getall():
                url = response.urljoin(href.extract())
                yield scrapy.Request(url, callback = self.getArticle)
        
    
    def getArticle(self, response):
        item = Article()

        item['name'] = response.xpath('//h1[@data-testid="headline"]/text()').get()

        item['author'] = response.xpath('//span[@itemprop="name"]/a/text()').get()

        item['publication_date'] = response.xpath('//time/@datetime').get()

        item['body'] = response.xpath('//section[@name="articleBody"]/div/div//p/text()').getall()

        item['source_url'] = response.url

        item['cover_url'] = response.xpath('//picture/img/@srcset').get()
        
        yield item
