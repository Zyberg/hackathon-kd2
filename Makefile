# Build image using Dockerfile
build-image:
	docker image build . -t <dockerhub_name>/<container_name>:tag

# Create a container using the image created by Dockerfile
run-image:
	docker run -p 3000:3000 <image_name/image_id>

# Create an image and start the app container using docker-compose
up-dev:
	docker-compose -f ./strava-backend/docker-compose.yml -f ./strava-frontend/docker-compose.yml up --build 

# Stop a container started using docker-compose
down:
	docker-compose down