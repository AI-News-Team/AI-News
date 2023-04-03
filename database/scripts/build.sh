
#
#   Build and run a new container for the database
#   Usage: ./build.sh
#

if [ -z ../.env ] ; then
  echo "Unable to initalize database!"
  echo "Missing `../.env` file ❌";
  exit 1;
fi
source ../.env;

# check for Docker Daemon
if (! docker stats --no-stream &> /dev/null) ; then
  echo "Docker Daemon not found ❌";\
  exit $EXIT_ERORR;\
else
  echo "Docker Daemon running 😈";
fi

cd ../;

# Remove a running container of $TAG
if [ "$(docker ps -aq -f name=$IMAGE_TAG)" ]; then
  docker rm -f $IMAGE_TAG &> /dev/null;

  # Remove the image of $IMAGE_TAG
  if [[ `docker image inspect  $IMAGE_TAG --format='found' 2> /dev/null` == 'found' ]] ; then
    docker rmi $IMAGE_TAG;
  fi
fi

# Build image
docker build \
  --rm \
  --build-arg port=$PORT \
  --build-arg username=$USERNAME \
  --build-arg database=$DATABASE \
  -q \
  -t \
  $CONTAINER_NAME . \
  1> /dev/null;

if [[ $1 == '-d' || $1 == '--development' ]] ; then
  # Run container ( attach, and redirect stderr and stdout )
  docker run \
    --rm \
    --name $CONTAINER_NAME \
    -e POSTGRES_PASSWORD=$PASSWORD \
    -e POSTGRES_USER=$USERNAME \
    -e POSTGRES_DB=$DATABASE \
    -p $PORT:$PORT \
    -m $MEMORY_LIMIT \
    -a STDERR \
    -a STDERR \
    $IMAGE_TAG \
    1> /dev/null;
else 
  # Run container ( production deteched mode )
  docker run \
    --rm \
    --name $CONTAINER_NAME \
    -d \
    -e POSTGRES_PASSWORD=$PASSWORD \
    -e POSTGRES_USER=$USERNAME \
    -e POSTGRES_DB=$DATABASE \
    -m $MEMORY_LIMIT \
    -p $PORT:$PORT \
    $IMAGE_TAG \
    1> /dev/null;

  if [[ $? == 0 ]] ; then
    echo "$PORT Online 🚀 [Detached Mode]";
  else
    echo "Whoops! Something went wrong ❌";
    exit $EXIT_ERROR;
  fi
fi

exit $EXIT_SUCCESS;