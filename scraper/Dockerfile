FROM python:3.9
WORKDIR /scraper

RUN apt update \
  && apt install -y cron;
RUN crontab;

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt;

COPY . .

RUN \
  chmod u+x scrape.cron.sh; \
  mv scrape.cron.sh /etc/cron.d/scrape.cron.sh; \
  crontab /etc/cron.d/scrape.cron.sh; \
  touch /var/log/cron.log

CMD cron && \
  tail -f /var/log/cron.log

# ENTRYPOINT ["./runspiders.sh"]