SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
0 0 * * * cd /scraper && ./runspiders.sh >> /var/log/cron.log 2>&1 # Run scraper daily at midnight

