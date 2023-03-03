PORT=5432;
TAG=ai_news_database;
CONTAINER=$TAG;

# Remove a running container of $TAG
if [ "$(docker ps -aq -f name=$TAG)" ]; then
  docker rm -f $TAG;

  # Remove the image of $TAG ( prevent backlog of <unnamed> images )
  if [[ `docker image inspect $TAG --format='found' 2> /dev/null` == 'found' ]] ; then
    docker rmi $TAG ;\
  fi
fi
docker build -t $CONTAINER .;

if [[ $1 == '-d' || $1 == '--development' ]] ; then
  # Run container ( attach, and redirect stderr and stdout )
  docker run \
    --rm --name $CONTAINER \
    -p $PORT:$PORT \
    -a STDERR -a STDERR \
    $TAG;
else 
  # Run container ( production deteched mode )
  docker run \
    --rm --name $CONTAINER \
    -d \
    -p $PORT:$PORT \
    $TAG;

  if [[ $? == 0 ]] ; then \
    echo "$PORT Online 🚀 [Detached Mode]";\
  else
    echo "Whoops! Something went wrong ❌";\
  fi
fi

exit 0;