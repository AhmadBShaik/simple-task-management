sudo docker run -d --name simple-task-management -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password -p 27017:27017 -v simple-task-management:/data/db mongo:latest

sudo docker build -t simple-task-management-backend:v0.0.1 .

sudo docker run -it -p 5000:5000 simple-task-management-backend:v0.0.1
