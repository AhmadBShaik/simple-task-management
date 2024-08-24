# Makefile

# Variables
DEV_COMPOSE_FILE = docker-compose.dev.yml
PROD_COMPOSE_FILE = docker-compose.yml

# Commands
up-dev:
	@echo "Starting development environment..."
	sudo docker compose -f $(DEV_COMPOSE_FILE) up --build

down-dev:
	@echo "Stopping development environment..."
	sudo docker compose -f $(DEV_COMPOSE_FILE) down

up-prod:
	@echo "Starting production environment..."
	sudo docker compose -f $(PROD_COMPOSE_FILE) up --build

down-prod:
	@echo "Stopping production environment..."
	sudo docker compose -f $(PROD_COMPOSE_FILE) down

.PHONY: up-dev down-dev up-prod down-prod
