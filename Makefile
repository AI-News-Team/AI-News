.PHONY: start environment clean build restart

# build and start the services
start:
	make environment
	docker-compose up

# Collect environment variables
environment:
	cat ./database/.env > ./.env
	echo -e '' >> ./.env
	cat ./server/.env >> ./.env
	echo -e '' >> ./.env
	cat ./client/.env >> ./.env
	echo -e '' >> ./.env
	cat ./search/.env >> ./.env 

# Remove all containers and volumes
clean:
	docker-compose down --volumes --rmi all
	rm ./.env

# Build the images
build:
	make environment
	docker-compose build

# clean then start
restart:
	make clean \
	&& make start
