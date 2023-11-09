import unittest
import requests
from scrapy.http import HtmlResponse
from newsscrapper.spiders.bbc import BbcSpider

# List of expected URLs + categories
expected_urls = [
    "https://www.bbc.com/news/world",
    "https://www.bbc.com/news/world/asia",
    "https://www.bbc.com/news/business",
    "https://www.bbc.com/news/technology",
    "https://www.bbc.com/news/health",
]

class BbcSpiderTest(unittest.TestCase):

    def setUp(self):
        self.spider = BbcSpider()

    def fetch_main_page_html(self):
        url = 'https://www.bbc.com/news'
        response = requests.get(url)

        if response.status_code == 200:
            return HtmlResponse(url=url, body=response.text, encoding='utf-8')

        return None

    # Parse the main page and returns the results to avoid requesting the main page multiple times
    # and to keep track of the changes in the main page what will ensure that the spider is fetching
    # the most updated version of the main page
    def parseMainPage(self):
        main_page_response = self.fetch_main_page_html()

        if main_page_response:
            return list(self.spider.parse(main_page_response))
        else:
            return None

    def get_first_article_html(self):
        main_page_response = self.fetch_main_page_html()

        if main_page_response:
            # Extracts article URL from the "gel-wrap gs-u-pt+" CSS class
            first_article_url = main_page_response.xpath('//li[@data-entityid="most-popular-read-1"]//a/@href').get()
            
            # Returns html response of the first article if can be fetched
            if first_article_url:
                base = 'https://www.bbc.com'
                first_article_url = base + first_article_url

                first_article_response = requests.get(first_article_url)

                if first_article_response.status_code == 200:
                    return HtmlResponse(url=first_article_url, body=first_article_response.text, encoding='utf-8')
                else:
                    return None
            else:
                return None
        else:
            return None

    def test_categories_fetching(self):
        results = self.parseMainPage()

        if results:
            # Check if the URLs of the category pages are in the results
            for url in expected_urls:
                url_found = any(url in str(result.url) for result in results)
                self.assertTrue(url_found, f"Expected URL '{url}' not found in any URL.")
            
            # Prints success message
            print("")
            print("======================================================================")
            print("Test:    test_categories_fetching")
            print("Status:  PASSED ☑")
            print("======================================================================")

        else:
            print("")
            print("======================================================================")
            print("Test:    test_categories_fetching")
            print("Status:  No results found ☒")
            print("======================================================================")
    
    def test_can_fetch_articles_in_categories(self):
        results = self.parseMainPage()

        if results:
            for result in results:
                if result.url in expected_urls:
                    category_page_response = requests.get(result.url)

                    if category_page_response.status_code == 200:
                        category_page_html = HtmlResponse(url=result.url, body=category_page_response.text, encoding='utf-8')
                        articles = list(self.spider.getCategory(category_page_html))

                        # Checks if the spider can fetch the articles
                        self.assertTrue(len(articles) > 0, f"No articles found in {result.url}")
                    else:
                        print(f"Error fetching {result.url}")
                        print("")
                        print("======================================================================")
                        print("Test:    test_can_fetch_articles_in_categories")
                        print(f"Status:  Error fetching {result.url} ☒")
                        print("======================================================================")
            
            # Prints success message
            print("")
            print("======================================================================")
            print("Test:    test_can_fetch_articles_in_categories")
            print("Status:  PASSED ☑")
            print("======================================================================")
    
    def test_can_fetch_articles_values(self):
        first_article = self.get_first_article_html()

        if first_article:
            # Checks if the article has all the required values
            self.assertIsNotNone(first_article.xpath('//head/meta[@property="article:section"]/@content').get(), "Article category not found")
            self.assertIsNotNone(first_article.xpath('//h1/text()').get(), "Article name not found")
            self.assertIsNotNone(first_article.xpath('//div[contains(@class, "ssrcss-68pt20-Text-TextContributorName")]/text()').get(), "Article author not found")
            self.assertIsNotNone(first_article.xpath('//time[@data-testid="timestamp"]/@datetime').get(), "Article date not found")
            self.assertIsNotNone(first_article.xpath('//div[contains(@data-component, "text-block")]/div//text()').getall(), "Article body not found")

            # Prints success message
            print("")
            print("======================================================================")
            print("Test:    test_can_fetch_articles_values")
            print("Status:  PASSED ☑")
            print("======================================================================")
        else:
            print("")
            print("======================================================================")
            print("Test:    test_can_fetch_articles_values")
            print("Status:  Article not found ☒")
            print("======================================================================")

if __name__ == '__main__':
    unittest.main()
