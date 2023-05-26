
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
if [ "$(docker ps -aq -f name=$DATABASE_IMAGE_TAG)" ]; then
  docker rm -f $DATABASE_IMAGE_TAG &> /dev/null;

  # Remove the image of $IMAGE_TAG
  if [[ `docker image inspect  $DATABASE_IMAGE_TAG --format='found' 2> /dev/null` == 'found' ]] ; then
    docker rmi $DATABASE_IMAGE_TAG;
  fi
fi

# courtesy old volume cleanup
echo 'delete unused docker volumes? [Y/N]'
read -r response
if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]] ; then
  docker volume prune -f
  echo 
fi
# Build image
docker build \
  --rm \
  -q \
  -t $DATABASE_CONTAINER_NAME \
  . \
  1> /dev/null;

# run contianer
function run {
  local attached=$1; # `1` or `0`
  docker run \
    --rm \
    --name $DATABASE_CONTAINER_NAME \
    -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
    -e POSTGRES_USER=$POSTGRES_USER \
    -e POSTGRES_DB=$POSTGRES_DB \
    -p $DATABASE_PORT:$DATABASE_PORT \
    -m $DATABASE_MEMORY_LIMIT \
    `if [[ "$attached" = false ]] ; then echo '-d'; fi` \
    `if [[ "$attached" = true ]] ; then echo '-a STDERR -a STDERR'; fi` \
    $DATABASE_IMAGE_TAG \
    1> /dev/null;
}
function runAttached { run true; }
function runDetatched { run false; }

if [[ $1 == '-d' || $1 == '--development' ]] ; then
  runAttached; # run in development mode
  exit $EXIT_SUCCESS;
fi

runDetatched; # run container
if [[ $? == 0 ]] ; then
  echo "$DATABASE_PORT Online 🚀 [Detached Mode]";
else
  echo "Whoops! Something went wrong ❌";
  exit $EXIT_ERROR;
fi

exit $EXIT_SUCCESS;