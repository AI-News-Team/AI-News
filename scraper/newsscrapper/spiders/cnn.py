import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.item import Item, Field
from newsscrapper.items import Article

import json
import requests
import os

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

    custom_settings = {
        # 'FEED_URI': 'data/cnn_output.json',
        # 'OUTPUT_FILE': output_file
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



    # def spider_closed(self, spider):
    #     output_file_path = 'data/cnn_output.json'
        
    #     with open(output_file_path, encoding="utf8") as f:
    #         data = json.load(f)
    #         response = requests.post(
    #             self.url, json = {"articles": data}, 
    #             headers={'Content-Type': 'application/json'}
    #         )
        
    #         if response.status_code != 200:
    #             raise Exception('Failed to send data: {response.text}')
            
    #         if response.status_code == 200:
    #             print('Data sent successfully')

    #             if os.path.exists(output_file_path):
    #                 os.remove(output_file_path)
    #             else:
    #                 print(f'File "{output_file_path}" does not exist.')

