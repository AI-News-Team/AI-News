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

See [`Environment 🌐`](../README.md#environment) for more information.

### Setting Tokens

Generate tokens using the website (URL attached in template.env file) and add them to `.env` variables.

In `api` directory run the following script, before accessing routes.
Otherwise, it will throw error `"Tokens do not exist in DB. You must set the tokens before accessing the routes"`

```shell
./gentokens.sh
```

You can validate that tokens are saved with: 

```shell
cd database/scripts/
./attach.sh
```
In `DB` run the following:

```shell
select * from Tokens;
```