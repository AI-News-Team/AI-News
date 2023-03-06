# REST API

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

Under the `API` section, set all environment variable to enable database connectivity.

You'll find a set of default credentials in the Dockerfile that match those in the `.env`. Host can be either `0.0.0.0`,`localhost`, or `127.0.0.1` for a local database. `DB_NAME` is `POSTGRES_DB`.

Ignore `DB_CONNECTION_STRING`. Though this _may_ be used for offsite deployments later on.

## Deployment

```

```

## Documentation

Check out our docs!

[`Postman Documentation 📬`](https://documenter.getpostman.com/view/18456662/2s93CUGVNW)
