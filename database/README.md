# Postgres Database

## Installation

Clone, and navigate to the `/database` directory.

```shell
git clone https://github.com/RozadoStudioProjectsOP/ai_driven_news_outlet
cd ai_driven_news_outlet/Database
```

## Configuration

### Docker

Ensure you have docker installed and the docker daemon is running. Then run

```shell
./init.sh
```

Assuming a valid environment, the container should build and start the Postgres database

> Note: This command will remove any instances of itself currently running and delete any old builds of the docker image so you don't get a backlog of stale images.

### Development Mode

Run with `-d` or `--development` to run in `attached` mode

```shell
./init.sh -d
# or
./init.sh --development
```

`Stdout` and `stderr` are redirected to your terminal session in this mode as well.

## Deployment

```

```

## Contribution

```

```

## License

```

```
