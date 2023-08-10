FROM python:3.9
WORKDIR /paraphraser

RUN apt update \
  && apt install -y cron;
RUN crontab;

COPY reWriter/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt;

COPY virtual.env /.env

COPY reWriter .

RUN \
  chmod u+x reWriter.cron.sh; \
  cat /.env > .temp; \
  cat reWriter.cron.sh >> .temp; \
  mv .temp reWriter.cron.sh; \
  mv reWriter.cron.sh /etc/cron.d/reWriter.cron.sh; \
  crontab /etc/cron.d/reWriter.cron.sh; \
  touch /var/log/cron.log;

CMD \
  ./init.sh && \
  cron && \
  tail -f /var/log/cron.log;