
#
#   Generate an SQL backup file for the data
#   Usage: ./backup.sh
#

if [ -z ../../local.env ] ; then
  echo "Unable to backup database!"
  echo "Missing `../../local.env` file ❌";
  exit 1;
fi
source ../../local.env;

if [ ! -d $DATABASE_BACKUP_DIR ] ; then
  mkdir $DATABASE_BACKUP_DIR;
fi

# ref: https://www.postgresql.org/docs/current/app-pg-dumpall.html

BACKUP_NAME=`date +%Y-%m-%d"T"%H-%M-%S`.backup.sql;
docker exec \
  -it \
  $CONTAINER_NAME \
    pg_dump \
      --column-inserts \
      -a \
      -U $USERNAME \
      $DATABASE \
    > $DATABASE_BACKUP_DIR/$BACKUP_NAME;

echo "Backup successful: $BACKUP_NAME";

exit $EXIT_SUCCESS;