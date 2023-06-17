import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.item import Item, Field
from newsscrapper.items import Article
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

    # Extracts all the links for the categories
    def parse(self, response):
        for categories in response.xpath('//ul[@class="gs-o-list-ui--top-no-border nw-c-nav__wide-sections"]//a/@href').getall():
            url = response.urljoin(str(categories))
            yield scrapy.Request(url, callback = self.getCategory, meta={'categories': categories})

    # Extracts all the links for the articles in the categories
    def getCategory(self, response):
        fetched_category = response.xpath('//head/meta[@property="article:section"]/@content').get()
        for href in response.xpath('//div[@class="mpu-available"]//a/@href').getall():
            url = response.urljoin(href)

            # Checks if the category is in not in DB and if it is not, then returns None
            if fetched_category in ['BBC World News: 24 hour news TV channel', 'Video', 'Stories', 'World News TV', 'In Pictures', 'Reality Check', 'Newsbeat', 'Long Reads']:
                yield None
            else:
                yield scrapy.Request(url, callback=self.getArticle, meta={'category': fetched_category})

    # Extracts all the information from the article
    def getArticle(self, response):
        item = Article()
        item['name'] = response.xpath('//h1/text()').get()
        item['author'] = response.xpath('//div[contains(@class, "ssrcss-68pt20-Text-TextContributorName")]/text()').get() or 'bbc'
        item['publication_date'] = response.xpath('//time[@data-testid="timestamp"]/@datetime').get()
        item['publication_date'] = response.xpath('//time[@data-testid="timestamp"]/@datetime').get()
        item['body'] = response.xpath('//div[contains(@data-component, "text-block")]/div//text()').getall()

        # checks if item['body'] is empty and if it is, then return None
        if not item['body']:
            return None
        
        # Reassigns the category to the ones from DB
        if response.meta['category'] in ['Asia', 'UK', 'War in Ukraine']:
            response.meta['category'] = 'World'
        elif response.meta['category'] == 'Entertainment & Arts':
            response.meta['category'] = 'Entertainment'
        elif response.meta['category'] == 'Coronavirus':
            response.meta['category'] = 'Health'
        elif response.meta['category'] == 'Technology':
            response.meta['category'] = 'tech'
        elif response.meta['category'] == 'Science & Environment' or response.meta['category'] == 'Climate':
            response.meta['category'] = 'science'

        category = response.meta['category']
        category = category.lower()

        item['category'] = category

        item['source_url'] = response.url
        item['cover_url'] = response.xpath('//div[@data-component="image-block"]/figure/div/span/picture/img/@src').get()

        # Checks for different layouts
        if response.xpath('//div[contains(@data-component, "text-block")]'):
            item['body'] = response.xpath('//div[contains(@data-component, "text-block")]/div//text()').getall()
            
        if response.xpath('//div[@class="article__body-content"]'):
            item['author'] = response.xpath('//div[@class="author-unit"]/div/a/text()').get()
            item['publication_date'] = response.xpath('//div[@class="author-unit"]/div/span/text()').get()
            item['publication_date'] = response.xpath('//div[@class="author-unit"]/div/span/text()').get()
            item['body'] = response.xpath('//div[@class="body-text-card b-reith-sans-font"]/div[2]/div/p/text()').getall()
            
        if response.xpath('//div[@data-testid="reveal-text-wrapper"]'):
            item['publication_date'] = response.xpath('//span[@class="qa-status-date-output"]/text()').get()
            item['body'] = response.xpath('//div[@data-reactid=".19qwbyoyauw.0.0.0.1"]/descendant-or-self::*[not(self::script)][normalize-space()]/text()').getall()

        yield item
        