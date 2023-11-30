# Web Client

### Full Demo (youTube link)
[![Watch the video](https://img.youtube.com/vi/augQ6nfGkf8/hqdefault.jpg)](https://www.youtube.com/embed/augQ6nfGkf8)

## How to Run the Client

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

Set up environmental variables in the project root.

Run front end
```shell
npm run dev
```

### 6. Repeat the process
If you have already set everything up once, you can use the script in the client folder to start the database and server in one go, just go to the client folder and enter:
```shell
./init-client.sh
```
