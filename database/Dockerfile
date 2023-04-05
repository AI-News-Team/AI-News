ARG port
ARG username
ARG database 

FROM postgres
WORKDIR /db

COPY ./src /docker-entrypoint-initdb.d/
EXPOSE $port