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
    start_urls = ['https://edition.cnn.com/world']
    output_file = 'data/cnn_output.json'

    def parse(self, response):
        for href in response.xpath('//div[@class="stack"]//a/@href'):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url, callback = self.getArticle)
        
    
    def getArticle(self, response):
        item = Article()
        
        item['name'] = response.xpath('//h1[@id="maincontent"]/text()').get().strip()

        item['author'] = response.xpath('//span[@class="byline__name"]/text()').get()

        item['publication_date'] = response.xpath('//div[@class="timestamp"]/text()').get()
        item['publication_date'] = item['publication_date'].split(',', 1)[1].strip() if item['publication_date'] else "Not Found"
                
        body_text = [text.strip() for text in response.xpath('//div[@class="article__content"]/p//text()').getall()]
        body_text = ' '.join(body_text)
        item['body'] = body_text

        item['category'] = 'news'

        item['source_url'] = response.url
        item['cover_url'] = response.xpath('//picture[@class="image__picture"]/source/@srcset').get()

        if response.xpath('//div[@class="gallery-inline__container"]'):
            item['body'] = response.xpath('//span[@class="inline-placeholder"]/text()').getall()
            # item['cover_url'] = response.xpath('//picture[@class="image_gallery-image__picture"]/img/@src').getall()

        for key in ['name', 'author', 'publication_date', 'cover_url']:
            if not item[key]:
                item[key] = "Not Found"

        yield item
