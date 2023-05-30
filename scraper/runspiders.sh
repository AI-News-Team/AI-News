#!/bin/bash
echo 'starting scraping...' >> /var/log/cron.log 2>&1
cd /scraper/newsscrapper/spiders

# ensure environment variables are set
# (might be run by cron)
PATH=$PATH:/usr/local/bin
export PATH

source /scraper/container.env
echo "Sending scraped data to $API_HOST:$API_PORT" >> /var/log/cron.log 2>&1

spiders=("cnn" "newYorkTimes" "bbc" "foxNews")
for spider in "${spiders[@]}"; do
    echo "crawling $spider..." >> /var/log/cron.log 2>&1 
    scrapy crawl $spider >> /var/log/cron.log 2>&1
done
echo 'scraping complete!' >> /var/log/cron.log 2>&1