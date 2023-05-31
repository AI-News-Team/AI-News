### Running the re-Writer Module locally

- Maker sure the database and server are running by opening docker desktop, then performing the following in the terminal

` cd client `

` ./init-client.sh `

- Scrape Data as instructed here: https://github.com/AI-News-Team/AI-News/blob/gseal-56-reWriter-module/scraper/README.md.  Scraped data is now added to a table titled 'Article_Raw' and will NOT populate the front end.
- enter the reWriter folder and begin the process

` cd reWriter `

` python reWriter.py `

Articles will be loaded to the database table 'Article' one at a time.  Frontend will pick up new stories loaded as they appear
