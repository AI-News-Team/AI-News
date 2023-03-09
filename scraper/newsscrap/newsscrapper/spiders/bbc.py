import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.item import Item, Field
from newsscrapper.items import Article

#
#   cd to spiders
#   scrapy crawl bbc (to run spider)
#   scrapy shell "https://www.bbc.com/news"
#

class BbcSpider(scrapy.Spider):
    name = "bbc"
    allowed_domains = ['bbc.com']
    start_urls = ['https://www.bbc.com/news']

    # rules = (
    #     Rule(
    #         LinkExtractor (allow=('/news', '/sport', '/world', '/asia', '/uk', '/business', '/technology', '/science_and_environment', '/stories')), 
    #         callback='parse', 
    #         follow=True
    #     ),
    # )

    def parse(self, response):
        for href in response.xpath('//a[contains(@class, "gs-c-promo-heading")]/@href'): 
            print(href)
            url = response.urljoin(href.extract())
            yield scrapy.Request(url, callback = self.getArticle)

        #   MOST READ ARTICLES
        #for href in response.xpath('//div[@class="gs-o-media__body"]/a/@href').getall() : print(href)
    
    def getArticle(self, response):
        item = Article()
        item['name'] = response.xpath('//h1/text()').get()
        item['author'] = response.xpath('//div[contains(@class, "ssrcss-68pt20-Text-TextContributorName")]/text()').get()
        item['source_url'] = response.url


        yield item
        


