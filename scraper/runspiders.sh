#!/bin/bash
cd newsscrapper/spiders

spiders=( "cnn" "newYorkTimes" "bbc" "foxNews")
for spider in "${spiders[@]}"; do
    echo "crawling $spider..."
    scrapy crawl $spider
done
echo 'scraping complete!'
