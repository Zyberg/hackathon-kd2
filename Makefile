# Build image using Dockerfile
build-image:
	docker image build . -t zyberg/ping-stravify:0.0

# Create a container using the image created by Dockerfile
run-image:
	docker run -p 3000:3000 zyberg/ping-stravify:0.0

# Create an image and start the app container using docker-compose
up-prod:
	docker-compose up --build 

# Stop a container started using docker-compose
down:
	docker-compose down