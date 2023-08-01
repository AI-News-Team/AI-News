SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

30 0 * * * cd /reWriter && python ./reWriter.py >> /var/log/cron.log 2>&1 # Run paraphraser at 00:30 every day ( scraper should be done by then )
