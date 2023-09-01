#!/bin/bash

if [ ! -d $DATABASE_BACKUP_DIR ] ; then
  mkdir $DATABASE_BACKUP_DIR;
fi

BACKUP_DATE=`date +%Y-%m-%d"T"%H-%M-%S`
BACKUP_NAME=$BACKUP_DATE.bak.sql;

pg_dump \
  --column-inserts \
  -a \
  -U $POSTGRES_USER \
  $POSTGRES_DB \
  > $DATABASE_BACKUP_DIR/$BACKUP_NAME;