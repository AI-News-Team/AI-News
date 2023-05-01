# Web Client

To run the front end through local host with a local database (via docker):

### 1. Clone the repo

```shell
git clone https://github.com/AI-News-Team/AI-News.git
```

### 2. Start the database:
Follow guides here: https://github.com/AI-News-Team/AI-News/tree/main/database/README.md

### 3. Configure and start the server
Follow guidelines here to configure:  https://github.com/AI-News-Team/AI-News/tree/main/server/README.md

Start the server.
```shell
cd server
npm start
```

### 4. Scrape data to populate the docker database
Follow guidelines here: https://github.com/AI-News-Team/AI-News/blob/main/scraper/README.md

### 5. Run the front end app

Set up environmental variables, making sure this matches what you have set in scraper and server .env's
```shell
cd client
cp template.env .env
```

Run front end
```shell
npm run dev
```

### 6. Repeat the process
If you have already set everything up once, you can use the script in the client folder to start the database and server in one go, just go to the client folder and enter:
```shell
./init-client.sh
```
