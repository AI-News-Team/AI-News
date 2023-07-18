# AI Driven News Outlet

[`Client 🧑‍💻`](/client/README.md)
[`API 📨`](/server/README.md)
[`Scrapper ⛏️`](/scraper/README.md)
[`Search 🔍`](/search/README.md)
[`Database 📦`](/database/README.md)

> 2023 BIT Studio 5/6 Project by **Artem Kechemaev**, **Greg Seal**, and **Aardhyn Lavender**

<br/>

## Live Prototype

Our prototype site is now live.

[`Launch 🚀`](https://ai-daily-news.op-bit.nz/)

## Installation and Configuration

```shell
git clone https://github.com/RozadoStudioProjectsOP/ai_driven_news_outlet/
cd ai_driven_news_outlet
```

### Environment

#### Local

Configure the sections from `template.local.env` in `local.env` for running the modules on your local machine.

```shell
cp template.local.env local.env # git ignore `local.env`
vim local.env # set undefined variables
```

Use whatever credentials you like for the `POSTGRES_USER` and `POSTGRES_PASSWORD` variables. You'll use these if you connect manually to the Database with `/database/scripts/attach.sh`.

The `/database/scripts/backup` script will ensure the the `BACKUP_DIR` directory exists before writing to it. You can set this to any directory you like.

#### Containerized

Configure the sections from `template.virtual.env` in `virtual.env` for running the modules though docker containers.

### Docker Compose

If you use `GNU Make`, you can use

```shell
make
# or, for verbosity
make start
```

> Check out /scripts for non-make versions

This builds the modules, and runs each service in respective containers

Use this command to delete everything when your done.

```
make clean
```

> This deletes all containers, volumes, and images created by the `make start` task

### Local Development

You can run each service on your host machine too.

Checkout the installation and configuration instructions in each module to get started.

## Service Communication

```mermaid
flowchart TD
B[API] --> A[Database]
C[Search Engine] --> B
B --> C
D[Client Application] --> B
B --> D
E[Web Scraper] -->  B
F[User] --> D
```
