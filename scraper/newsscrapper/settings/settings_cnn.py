BOT_NAME = "newsscrapper"

SPIDER_MODULES = ["newsscrapper.spiders"]
NEWSPIDER_MODULE = "newsscrapper.spiders"
PIPELINE_MODULE = 'newsscrapper.pipelines'

ROBOTSTXT_OBEY = True

# Configure maximum concurrent requests performed by Scrapy (default: 16)
CONCURRENT_REQUESTS = 16

DOWNLOAD_DELAY = 0.4

# Set settings whose default value is deprecated to a future-proof value
REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"

FEED_EXPORT_ENCODING = "utf-8"
FEED_EXPORT_FIELDS = ["name", "author", "date", "body", "category", "source_url", "cover_url"]
FEED_FORMAT = "json"
FEED_URI = 'data/cnn_output.json'
