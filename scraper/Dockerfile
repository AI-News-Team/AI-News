FROM python:3.9
WORKDIR /scraper
RUN apt-get update && apt-get install -y cron
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN chmod +x scrape.cron.sh
RUN mv scrape.cron.sh /etc/cron.d/scrape.cron.sh
RUN crontab /etc/cron.d/scrape.cron.sh

RUN tr -d "\r" < runspiders.sh
# ENTRYPOINT ["./runspiders.sh"]
RUN touch /var/log/cron.log
CMD cron && tail -f /var/log/cron.log