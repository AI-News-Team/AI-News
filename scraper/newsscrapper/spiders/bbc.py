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

    def parse(self, response):
        for categories in response.xpath('//ul[@class="gs-o-list-ui--top-no-border nw-c-nav__wide-sections"]//a/@href').getall():
            url = response.urljoin(str(categories))
            yield scrapy.Request(url, callback = self.getCategory, meta={'categories': categories})

    def getCategory(self, response):
        fetched_category = response.xpath('//head/meta[@property="article:section"]/@content').get()
        for href in response.xpath('//div[@class="mpu-available"]//a/@href').getall():
            url = response.urljoin(href)

            if fetched_category in ['BBC World News: 24 hour news TV channel', 'Video', 'Stories', 'World News TV', 'In Pictures', 'Reality Check', 'Newsbeat', 'Long Reads']:
                yield None
            else:
                yield scrapy.Request(url, callback=self.getArticle, meta={'category': fetched_category})

    
    def getArticle(self, response):
        item = Article()
        item['name'] = response.xpath('//h1/text()').get()
        item['author'] = response.xpath('//div[contains(@class, "ssrcss-68pt20-Text-TextContributorName")]/text()').get() or 'bbc'
        item['publication_date'] = response.xpath('//time[@data-testid="timestamp"]/@datetime').get()
        item['publication_date'] = response.xpath('//time[@data-testid="timestamp"]/@datetime').get()
        item['body'] = response.xpath('//div[contains(@data-component, "text-block")]/div//text()').getall()


        if not item['body']:
            return None
        
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

        # if response.xpath('//div[contains(@data-component, "text-block")]'):
        #     main_content = response.xpath('//main[@id="main-content"]')

        #     elements = main_content.xpath('.//*[self::div[@data-component="unordered-list-block"] or '
        #                                 'self::div[@data-component="subheadline-block"] or '
        #                                 'self::div[@data-component="text-block"]]')

        #     scraped_text = []

        #     for element in elements:
        #         print(element)
        #         text = element.xpath('.//text()').get()
        #         scraped_text.append(text)

        #     item["body"] = scraped_text
            
        # Loop starts from the end, works back, if a line of text does not end in a full stop (meaning it is link text, or prior to link text),
        # it will be combined it with the next line, next line will be removed from the list
        # print(item['body'])
        for i in reversed(range(len(item['body']))):
            text = item['body'][i].rstrip()
            item['body'][i] = text

            if (text[len(text)-1] != "." and text[len(text)-1] != '"' and i+1 != len(item['body'])):
                item['body'][i] = text + item['body'][i+1]
                del item['body'][i+1]
                
        if response.xpath('//div[@class="article__body-content"]'):
            item['author'] = response.xpath('//div[@class="author-unit"]/div/a/text()').get()
            item['publication_date'] = response.xpath('//div[@class="author-unit"]/div/span/text()').get()
            item['publication_date'] = response.xpath('//div[@class="author-unit"]/div/span/text()').get()
            item['body'] = response.xpath('//div[@class="body-text-card b-reith-sans-font"]/div[2]/div/p/text()').getall()
            
        if response.xpath('//div[@data-testid="reveal-text-wrapper"]'):
            item['publication_date'] = response.xpath('//span[@class="qa-status-date-output"]/text()').get()
            item['body'] = response.xpath('//div[@data-reactid=".19qwbyoyauw.0.0.0.1"]/descendant-or-self::*[not(self::script)][normalize-space()]/text()').getall()

        # print(item)
        yield item
        