.PHONY: start environment clean build

# build and start the services
start:
	make environment
	docker-compose up

# Collect environment variables
environment:
	cat ./database/.env > ./.env

# Remove all containers and volumes
clean:
	docker-compose down --volumes --rmi all
	rm ./.env

# Build the images
build:
	make environment
	docker-compose build
