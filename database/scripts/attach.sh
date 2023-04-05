
#
#   Open a postgres shell in the database container
#   Usage: ./attach.sh
#

if [ -z ../.env ] ; then
  echo "Unable to attatch to Postgres!"
  echo "Missing `../.env` file ❌";
  exit 1;
fi
source ../.env;

docker exec \
  -it $CONTAINER_NAME  \
    psql \
      -U $USERNAME \
      -d $DATABASE

exit $EXIT_SUCCESS;