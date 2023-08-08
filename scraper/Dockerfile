FROM python:3.9
WORKDIR /scraper

RUN apt update \
  && apt install -y cron;

COPY scraper/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt;

COPY virtual.env /.env

COPY scraper/ .

RUN \
  chmod u+x scrape.cron.sh; \
  cat /.env > .temp; \
  cat scrape.cron.sh >> .temp; \
  mv .temp scrape.cron.sh; \
  mv scrape.cron.sh /etc/cron.d/scrape.cron.sh; \
  crontab /etc/cron.d/scrape.cron.sh; \
  touch /var/log/cron.log;

CMD \
  ./runspiders.sh && \
  cron && \
  tail -f /var/log/cron.log;