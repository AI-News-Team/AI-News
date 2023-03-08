import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.item import Item, Field
from newsscrapper.items import News

#
#   cd to spiders
#   scrapy crawl bbc (to run spider)
#   scrapy shell "https://www.bbc.com/news"
#

class BbcSpider(scrapy.Spider):
    name = "bbc"
    allowed_domains = ['bbc.com']
    start_urls = ['https://www.bbc.com/news']

    rules = (
        Rule(
            LinkExtractor (allow=('/news', '/sport', '/world', '/asia', '/uk', '/business', '/technology', '/science_and_environment', '/stories')), 
            callback='parse', 
            follow=True
        ),
    )

    def parse(self, response):
        item = News()
        item['news_url'] = response.url
        item['article_names'] = response.xpath('//h3[@class="gs-c-promo-heading__title gel-pica-bold nw-o-link-split__text"]/text()').getall()
        item['article_summaries'] = response.xpath('//p[@class="gs-c-promo-summary gel-long-primer gs-u-mt nw-c-promo-summary"]/text()').getall()

        yield item

