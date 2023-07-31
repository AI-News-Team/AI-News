FROM python:3.9
WORKDIR /paraphraser

RUN apt update \
  && apt install -y cron;
RUN crontab;

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt;

COPY . .

RUN \
  chmod u+x reWriter.cron.sh; \
  mv reWriter.cron.sh /etc/cron.d; \
  crontab /etc/cron.d/reWriter.cron.sh;

ENTRYPOINT ["./init.sh"]