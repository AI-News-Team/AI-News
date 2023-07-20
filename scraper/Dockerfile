FROM python:3.9
WORKDIR /scraper
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENTRYPOINT ["./runspiders.sh"]