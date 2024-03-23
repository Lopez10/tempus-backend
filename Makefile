docker-up:
	@echo "Up docker-compose"
	docker-compose -f ./docker-compose.yml up

docker-down:
	@echo "Down docker-compose"
	docker-compose -f ./docker-compose.yml down

push-db: 
	docker-compose run backend npx prisma db push