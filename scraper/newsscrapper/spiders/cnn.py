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
        sections = response.xpath('//article[contains(a/@href, "")]')

        for section in sections:
            links = section.xpath('//a/@href').extract()

            links = response.xpath('//a[not(contains(@class,"cn__title--link icon"))/@href').getall()
            print(links)

            for link in links:
                url = response.urljoin(link)
                yield scrapy.Request(url, callback = self.getArticle)
        
    
    def getArticle(self, response):
        item = Article()
        item['name'] = response.xpath('//div[@class="byline__names"]/a/text()').getall()
        item['source_url'] = response.url

        yield item

