from dotenv import load_dotenv
import os

load_dotenv()
API_PORT = os.getenv("API_PORT")

BOT_NAME = "newsscrapper"

SPIDER_MODULES = ["newsscrapper.spiders"]
NEWSPIDER_MODULE = "newsscrapper.spiders"
ITEM_PIPELINES = {
   "newsscrapper.pipelines.NewsscrapperPipeline": 300,
}

# Only displays errors in terminal
LOG_LEVEL = 'ERROR'  

ROBOTSTXT_OBEY = True

# Configure maximum concurrent requests performed by Scrapy (default: 16)
CONCURRENT_REQUESTS = 16

DOWNLOAD_DELAY = 0.4

# Set settings whose default value is deprecated to a future-proof value
REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"

FEED_EXPORT_ENCODING = "utf-8"
FEED_EXPORT_FIELDS = ["name", "author", "publication_date", "body", "category", "source_url", "cover_url", ]
FEED_FORMAT = "json"
