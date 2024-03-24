docker-prod-up:
	@echo "Up docker-compose in production"
	docker-compose -f ./docker-compose.prod.yml up

docker-prod-down:
	@echo "Down docker-compose"
	docker-compose -f ./docker-compose.yml down

docker-local-up:
	@echo "Up docker-compose in local"
	docker-compose -f ./docker-compose.local.yml up