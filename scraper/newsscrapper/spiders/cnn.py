import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.item import Item, Field
from newsscrapper.items import Article

#
#   cd to spiders
#   scrapy crawl cnn (to run spider)
#   scrapy shell "https://edition.cnn.com/"
#

class CNNSpider(scrapy.Spider):
    name = "cnn"
    allowed_domains = ['edition.cnn.com']
    start_urls = ['https://edition.cnn.com/']

    def parse(self, response):
        for href in response.xpath('//a[contains(@class, "gs-c-promo-heading")]/@href'): 
            print(href)
            url = response.urljoin(href.extract())
            
            yield scrapy.Request(url, callback = self.getArticle)
    
    def getArticle(self, response):
        item = Article()
        item['name'] = response.xpath('//h1/text()').get()
        item['author'] = response.xpath('//div[contains(@class, "ssrcss-68pt20-Text-TextContributorName")]/text()').get()
        item['source_url'] = response.url

        yield item
        


