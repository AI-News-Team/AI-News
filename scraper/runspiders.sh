cd newsscrapper/spiders

scrapy crawl cnn

for i in {10..1};
do
    echo "NEXT SPIDER WILL RUN IN: $i"
    sleep 1
done

scrapy crawl bbc