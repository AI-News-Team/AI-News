FROM postgres
WORKDIR /db
COPY ./src /docker-entrypoint-initdb.d/
RUN tr -d '\015' init. > init.sh
EXPOSE $port