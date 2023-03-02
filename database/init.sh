PORT=5432
TAG=ai_news_database
CONTAINER=$TAG

docker build -t $CONTAINER .
# todo: stop if running...
docker run --rm --name $CONTAINER -d -p $PORT:$PORT $TAG 