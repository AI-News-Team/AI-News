import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.item import Item, Field
from newsscrapper.items import Article

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

    custom_settings = {
        'SETTINGS_MODULE': 'newsscrapper.settings.settings_cnn',
        'ITEM_PIPELINES': {
            'newsscrapper.pipelines.pipeline_cnn.PipelineCNN': 100,
        }
    }

    def parse(self, response):
        for href in response.xpath('//div[@class="stack"]//a/@href'):
            url = response.urljoin(href.extract())
            yield scrapy.Request(url, callback = self.getArticle)
        
    
    def getArticle(self, response):
        item = Article()
        
        item['name'] = response.xpath('//h1[@id="maincontent"]/text()').get().strip()

        item['author'] = response.xpath('//span[@class="byline__name"]/text()').get()

        item['date'] = response.xpath('//div[@class="timestamp"]/text()').get().strip()
        item['date'] = item['date'].replace('Updated\n', '').replace('Published\n', '')
        item['date'] = item['date'].strip()

        item['category'] = 'World'
        
        body_text = [text.strip() for text in response.xpath('//div[@class="article__content"]/p//text()').getall()]
        body_text = ' '.join(body_text)
        item['body'] = body_text

        item['source_url'] = response.url
        item['cover_url'] = response.xpath('//picture[@class="image__picture"]/source/@srcset').get()

        if response.xpath('//div[@class="gallery-inline__container"]'):
            item['body'] = response.xpath('//span[@class="inline-placeholder"]/text()').getall()
            item['cover_url'] = response.xpath('//picture[@class="image_gallery-image__picture"]/img/@src').getall()

        yield item

