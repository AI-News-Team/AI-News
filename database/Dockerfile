FROM postgres
WORKDIR /db
COPY ./src /docker-entrypoint-initdb.d/
RUN cat init.sh | tr -d '\015' > init.sh
EXPOSE $port