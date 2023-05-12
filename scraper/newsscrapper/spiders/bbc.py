import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.item import Item, Field
from newsscrapper.items import Article
import json
from urllib.parse import urlparse

#
#   cd to spiders
#   scrapy crawl bbc (to run spider)
#   scrapy shell "https://www.bbc.com/news"
#

class BbcSpider(scrapy.Spider):
    name = "bbc"
    allowed_domains = ['bbc.com']
    start_urls = ['https://www.bbc.com/news']

    def parse(self, response):
        for categories in response.xpath('//ul[@class="gs-o-list-ui--top-no-border nw-c-nav__wide-sections"]//a/@href').getall():
            url = response.urljoin(str(categories))
            yield scrapy.Request(url, callback = self.getCategory, meta={'categories': categories})

    def getCategory(self, response):
        for href in response.xpath('//div[@class="mpu-available"]//a/@href').getall():
            url = response.urljoin(href)
            yield scrapy.Request(url, callback = self.getArticle)
    
    def getArticle(self, response):
        item = Article()
        json_data = response.xpath('//script[contains(text(), "ReportageNewsArticle")]/text()').get()
        data = json.loads(json_data)

        item['name'] = response.xpath('//head/meta[@property="og:title"]/@content').get()

        author = data['author'][0]['name']
        item['author'] = author

        publication_date = data['datePublished']
        item['publication_date'] = publication_date
        item['body'] = response.xpath('//div[contains(@data-component, "text-block")]/div/p[1]/text()').getall()

        item['category'] = response.xpath('//a[@class="ssrcss-1mu64ez-StyledLink eis6szr2"]//text()').get()
        item['source_url'] = response.url

        cover_url = data['image']['url']
        item['cover_url'] = cover_url

        # Checks if element text-block exists
        if response.xpath('//div[contains(@data-component, "text-block")]'):
            item['body'] = response.xpath('//div[contains(@data-component, "text-block")]/div/p/text()').getall()
            
        if response.xpath('//div[@class="article__body-content"]'):
            item['author'] = response.xpath('//div[@class="author-unit"]/div/a/text()').get()
            item['publication_date'] = response.xpath('//div[@class="author-unit"]/div/span/text()').get()
            item['publication_date'] = response.xpath('//div[@class="author-unit"]/div/span/text()').get()
            item['body'] = response.xpath('//div[@class="body-text-card b-reith-sans-font"]/div[2]/div/p/text()').getall()
            
        if response.xpath('//div[@data-testid="reveal-text-wrapper"]'):
            item['publication_date'] = response.xpath('//span[@class="qa-status-date-output"]/text()').get()
            item['body'] = response.xpath('//div[@data-reactid=".19qwbyoyauw.0.0.0.1"]/descendant-or-self::*[not(self::script)][normalize-space()]/text()').getall()

        yield item
