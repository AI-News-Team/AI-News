.PHONY: start environment clean build restart

# build and start the services
start:
	docker-compose \
		--env-file virtual.env \
		up

# Remove all containers and volumes
clean:
	docker-compose \
		--env-file virtual.env \
		down \
		--volumes \
		--rmi all \

# Build the images
build:
	docker-compose \
  	--env-file virtual.env \
		build

# clean then start
restart:
	make clean && \
		make start
