EXIT_ERROR=1;
EXIT_SUCCESS=0;

PORT=5432;
TAG=ai_news_database;
CONTAINER=$TAG;
MEMORY_LIMIT=128m; # sufficient for a dev environment?

# check for Docker Daemon
if (! docker stats --no-stream &> /dev/null) ; then
  echo "Docker Daemon not found ❌";\
  exit $EXIT_ERORR;\
else
  echo "Docker Daemon running 😈";
fi

# Remove a running container of $TAG
if [ "$(docker ps -aq -f name=$TAG)" ]; then
  docker rm -f $TAG &> /dev/null;

  # Remove the image of $TAG ( prevent backlog of <unnamed> images )
  if [[ `docker image inspect  $TAG --format='found' 2> /dev/null` == 'found' ]] ; then
    docker rmi $TAG;
  fi
fi
docker build -q -t $CONTAINER . 1> /dev/null;

if [[ $1 == '-d' || $1 == '--development' ]] ; then
  # Run container ( attach, and redirect stderr and stdout )
  docker run \
    --rm --name $CONTAINER \
    -p $PORT:$PORT \
    -m $MEMORY_LIMIT \
    -a STDERR -a STDERR \
    $TAG \
    1> /dev/null;
else 
  # Run container ( production deteched mode )
  docker run \
    --rm --name $CONTAINER \
    -d \
    -m $MEMORY_LIMIT \
    -p $PORT:$PORT \
    $TAG \
    1> /dev/null;

  if [[ $? == 0 ]] ; then
    echo "$PORT Online 🚀 [Detached Mode]";
  else
    echo "Whoops! Something went wrong ❌";
    exit $EXIT_ERROR;
  fi
fi

exit $EXIT_SUCCESS;