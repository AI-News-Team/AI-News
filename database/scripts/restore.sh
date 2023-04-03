
#
#   Restore a database from a backup file
#   Usage: ./restore.sh -f <filename>
#

if [ -z ../.env ] ; then
  echo "Unable to restore database!"
  echo "Missing `../.env` file ❌";
  exit 1;
fi
source ../.env;

if [ ! $1 ] ; then
  echo "Error: Restore requires 1 argument ❌";
  echo "Usage: ./restore.sh -f <filename>"
  exit 1;
fi
if [ ! -f $1 ] ; then
  echo "Backup file not found ❌";
  exit 1;
fi

docker cp $1 $CONTAINER_NAME:/tmp/backup.sql;
docker exec -it $CONTAINER_NAME \
  bash -c "
    psql \
      -U $USERNAME \
      -d $DATABASE\
      -f /tmp/backup.sql
  "
  
exit $EXIT_SUCCESS;