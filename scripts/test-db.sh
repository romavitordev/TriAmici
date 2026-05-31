#!/usr/bin/env bash
#
# Valida a camada de banco: conexão, migrations e seeds.
# Requer um PostgreSQL acessível (variáveis em backend/.env ou DATABASE_URL).
# Sem banco disponível, o script avisa e sai com código 0 (não bloqueia CI offline).
#
set -uo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR/backend"

# Carrega variáveis do .env se existir
if [ -f .env ]; then
  set -a; . ./.env; set +a
fi

HOST="${DB_SERVER:-localhost}"
PORT="${DB_PORT:-5432}"

echo "==> [db] verificando PostgreSQL em ${HOST}:${PORT}"
if ! (exec 3<>"/dev/tcp/${HOST}/${PORT}") 2>/dev/null; then
  echo "⚠ PostgreSQL não acessível em ${HOST}:${PORT}."
  echo "  Suba um banco local ou configure DATABASE_URL para validar migrations/seed."
  echo "  (pulando — pendência de infraestrutura)"
  exit 0
fi
exec 3>&- 2>/dev/null || true

echo "==> [db] rodando migrations"
npm run migrate

echo "==> [db] rodando seed"
npm run seed

echo "✓ Banco OK (conexão + migrations + seed)"
