# AudiWebPlus

# Comandos importantes Docker

* docker compose up --build -> Para construir imagen docker y levantar los servicios
* docker compose up -> Solo levantar los contenedores
* docker compose down -> Bajar contenedores

# Comandos Ollama

* ollama serve -> Levantar servior Ollama
* ollama run llama3.1 -> Iniciar modelo llama3.1

# Endpoints

Status

GET http://localhost:3001/health

Models

GET http://localhost:3001/api/models
GET http://localhost:3001/api/models/:id
GET http://localhost:3001/api/models/:id/configurations
POST http://localhost:3001/api/models
PUT http://localhost:3001/api/models/:id
DELETE http://localhost:3001/api/models/:id

Configurations

GET http://localhost:3001/api/configurations
GET http://localhost:3001/api/configurations/:id
POST http://localhost:3001/api/configurations
PUT http://localhost:3001/api/configurations/:id
DELETE http://localhost:3001/api/configurations/:id

Used Cars

GET http://localhost:3001/api/used-cars
GET http://localhost:3001/api/used-cars/:id
POST http://localhost:3001/api/used-cars
PUT http://localhost:3001/api/used-cars/:id
DELETE http://localhost:3001/api/used-cars/:id

Newsletter

GET http://localhost:3001/api/newsletter
GET http://localhost:3001/api/newsletter/:id
POST http://localhost:3001/api/newsletter
PUT http://localhost:3001/api/newsletter/:id
DELETE http://localhost:3001/api/newsletter/:id

Financing

GET http://localhost:3001/api/financing
GET http://localhost:3001/api/financing/:id
POST http://localhost:3001/api/financing
PUT http://localhost:3001/api/financing/:id
DELETE http://localhost:3001/api/financing/:id

Appointments

GET http://localhost:3001/api/appointments
GET http://localhost:3001/api/appointments/:id
POST http://localhost:3001/api/appointments
PUT http://localhost:3001/api/appointments/:id
DELETE http://localhost:3001/api/appointments/:id

Chat

POST http://localhost:3001/api/chat