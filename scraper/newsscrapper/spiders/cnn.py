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
        # Extract the links from every section element that contains an "a" tag with an "href" attribute
        sections = response.xpath('//section[contains(a/@href, "")]')
        
        # Loop over each section element and extract the links
        for section in sections:
            links = section.xpath('.//a/@href').extract()

            # Do something with the links, such as yield a new request for each link
            for link in links:
                yield scrapy.Request(link, callback=self.getArticle)
    
    def getArticle(self, response):
        item = Article()
        item['name'] = response.xpath('//div[@class="byline__names"]/a/text()').getall()
        item['source_url'] = response.url

        yield item

