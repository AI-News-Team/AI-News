# REST API

## Documentation

Check out our docs!

[`Postman Documentation 📬`](https://documenter.getpostman.com/view/18456662/2s93CUGVNW)

## Installation

Clone, and navigate to the `/server` directory.

```shell
git clone https://github.com/RozadoStudioProjectsOP/ai_driven_news_outlet
cd ai_driven_news_outlet/server
```

## Configuration

### Postgres Database

view the [`Postgres Database 📦`](../database/README.md) instructions to configure and run your local database instance.

### Environment

```shell
cp template.env .env
vim .env
```

Under the `API` section, set all environment variable to enable database and Search Engine connectivity

Host can be either `0.0.0.0`,`localhost`, or `127.0.0.1` for a local database. `DB_NAME` is the same as `POSTGRES_DB`.

## Deployment

```

```
