.PHONY: build up down logs restart clean backup test lint

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

restart:
	docker-compose restart

clean:
	docker-compose down -v
	rm -rf data/*
	rm -rf logs/*
	rm -rf backups/*
	touch data/.gitkeep
	touch logs/.gitkeep
	touch backups/.gitkeep

backup:
	docker-compose exec backup /bin/sh -c "/backup/scripts/backup.sh"

test:
	docker-compose exec backend npm run test

lint:
	docker-compose exec backend npm run lint

monitor:
	docker stats

init-dev:
	cp .env.example .env
	mkdir -p data logs backups
	touch data/.gitkeep logs/.gitkeep backups/.gitkeep
