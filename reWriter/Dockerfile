FROM python:3.9
WORKDIR /paraphraser
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENTRYPOINT ["./init.sh"]