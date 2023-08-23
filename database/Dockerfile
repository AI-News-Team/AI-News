FROM postgres
WORKDIR /db

# backup|restore scripts
RUN mkdir -p /tmp/postgres/backups
COPY ./scripts/backup.virtual.sh /db/backup.sh
RUN chmod +x /db/backup.sh
COPY ./scripts/restore.virtual.sh /db/restore.sh
RUN chmod +x /db/restore.sh

COPY ./src /docker-entrypoint-initdb.d/

EXPOSE $port