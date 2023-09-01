#!/bin/bash

echo restoring backup from /tmp/postgres

psql \
  -U $POSTGRES_USER \
  -d $POSTGRES_DB \
  -f $DATABASE_BACKUP_DIR/*.bak.sql;

exit $?;