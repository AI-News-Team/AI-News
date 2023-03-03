FROM postgres
WORKDIR /db
ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB news_outlet_dev
COPY ./src /docker-entrypoint-initdb.d/
EXPOSE 5432