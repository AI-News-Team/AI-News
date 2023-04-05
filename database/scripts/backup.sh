
#
#   Generate an SQL backup file for the data
#   Usage: ./backup.sh
#

if [ -z ../.env ] ; then
  echo "Unable to backup database!"
  echo "Missing `../.env` file ❌";
  exit 1;
fi
source ../.env;

BACKUP_DIR=../backups;
if [ ! -d $BACKUP_DIR ] ; then
  mkdir $BACKUP_DIR;
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
    > $BACKUP_DIR/$BACKUP_NAME;

echo "Backup successful: $BACKUP_NAME";

exit $EXIT_SUCCESS;