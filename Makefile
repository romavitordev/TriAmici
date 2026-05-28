.PHONY: dev build migrate seed test logs stop

dev:
	cd backend && npm run dev
	cd ../frontend && npm run dev

build:
	cd backend && npm run build
	cd ../frontend && npm run build


migrate:
	cd backend && npm run migrate

seed:
	cd backend && npm run seed

test:
	cd backend && npm test

# logs e stop via Docker foram removidos.
# Para acompanhar o backend localmente, use: cd backend && npm run dev
# Para parar, encerre o processo no terminal.

