import unittest
import requests
from scrapy.http import HtmlResponse
from newsscrapper.spiders.bbc import BbcSpider

# List of expected URLs + categories
expected_urls = [
    "https://www.bbc.com/news/world",
    "https://www.bbc.com/news/world/asia",
    "https://www.bbc.com/news/uk",
    "https://www.bbc.com/news/business",
    "https://www.bbc.com/news/technology",
    "https://www.bbc.com/news/entertainment_and_arts",
    "https://www.bbc.com/news/health",
    "https://www.bbc.com/news/world-60525350",
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
            print("Status:  PASSED")
            print("======================================================================")

        else:
            print("No results found")
    
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
            
            # Prints success message
            print("")
            print("======================================================================")
            print("Test:    test_can_fetch_articles_in_categories")
            print("Status:  PASSED")
            print("======================================================================")
    
    def test_can_fetch_articles_values(self):
        main_page_response = self.fetch_main_page_html()

        if main_page_response:
            # Calls the parse method of the spider with the fetched main page response
            results = list(self.spider.parse(main_page_response))

            for result in results:
                if result.url in expected_urls:
                    category_url = result.url  # URL of the category page
                    category_page_response = requests.get(category_url)

                    if category_page_response.status_code == 200:
                        category_page_html = HtmlResponse(url=category_url, body=category_page_response.text, encoding='utf-8')
                        articles = list(self.spider.getCategory(category_page_html))

                        for article in articles:
                            article_url = article.url
                            article_response = requests.get(article_url)

                            if article_response.status_code == 200:
                                single_article_url = HtmlResponse(url=article_url, body=article_response.text, encoding='utf-8')
                                article_data = next(self.spider.getArticle(single_article_url))

                                # Check if the article has the expected values
                                self.assertTrue(article_data['name'], "Article name not found")
                                self.assertTrue(article_data['author'], "Article author not found")
                                self.assertTrue(article_data['publication_date'], "Article publication date not found")
                                self.assertTrue(article_data['body'], "Article body not found")
                                self.assertTrue(article_data['category'], "Article category not found")
                                self.assertTrue(article_data['source_url'], "Article source URL not found")
                                self.assertTrue(article_data['cover_url'], "Article cover URL not found")
                            else:
                                print(f"Error fetching {article_url}")
                    else:
                        print(f"Error fetching {category_url}")


if __name__ == '__main__':
    unittest.main()
