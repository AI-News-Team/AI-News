import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.item import Item, Field
from newsscrapper.items import Article

#
#   cd to spiders
#   scrapy crawl cnn (to run spider)
#   scrapy shell "https://edition.cnn.com/world"
#

class CNNSpider(scrapy.Spider):
    name = "cnn"
    allowed_domains = ['edition.cnn.com']
    start_urls = ['https://edition.cnn.com/world']

    def parse(self, response):
        for href in response.xpath('//div[@class="stack"]//a/@href'):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url, callback = self.getArticle)
        
    
    def getArticle(self, response):
        item = Article()
        
        item['name'] = response.xpath('//h1/text()').get()
        item['author'] = response.xpath('//span[@class="byline__name"]/text()').get()
        item['date'] = response.xpath('//div[@class="timestamp"]/text()').get()
        item['category'] = 'World'
        
        if response.xpath('//div[@class="article__content"]/p[a[contains(@href, "/a")]]'):
            body_text = response.xpath('//div[@class="article__content"]/p//text()').getall()

        else:
            body_text = response.xpath('//div[@class="article__content"]/p/text()').getall()

        for i in range(len(body_text)):
            body_text[i] = body_text[i].strip()

        body_text = ' '.join(body_text)

        item['body'] = body_text

        item['source_url'] = response.url
        item['cover_url'] = response.xpath('//picture[@class="image__picture"]/source/@srcset').get()

        yield item

