#!/bin/bash
cd newsscrapper/spiders

spiders=("bbc" "cnn" "newYorkTimes" "foxNews")
for spider in "${spiders[@]}"; do
    echo "crawling $spider..."
    scrapy crawl $spider
done
echo 'scraping complete!'
