# Devops Scripts for AI News

> Like `GNU **Make**? Don't use the scripts...
>
> ```shell
> # from project root
> make # `build`
> make build # `build`
> make clean # `clean`
> ```

## Execution

Run the scripts from the project root to maintain context

```shell
./scripts/start.sh
```

Otherwise the scripts _will_ fail.

## Scripts

| File             | Purpose                                           |
| :--------------- | :------------------------------------------------ |
| `start.sh`       | Build and run the application                     |
| `build.sh`       | Build the application                             |
| `clean.sh`       | Shutdown running containers, and purge containers |
