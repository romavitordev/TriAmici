#!/usr/bin/env bash
#
# Deploy automatizado Tri Amici — VPS Ubuntu 24 + PM2 + Nginx + PostgreSQL
# Uso: ./scripts/deploy.sh  (a partir da raiz do projeto, ex: /var/www/triamici)
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "==> [1/6] Atualizando código (git pull)"
git pull --ff-only

echo "==> [2/6] Instalando dependências (inclui devDependencies p/ build)"
npm install --include=dev

echo "==> [3/6] Rodando migrations do banco"
npm --workspace backend run migrate

echo "==> [4/6] Build do backend"
npm --workspace backend run build

echo "==> [5/6] Build do frontend"
npm --workspace frontend run build

echo "==> [6/6] (Re)start dos processos PM2"
# Backend
if pm2 describe triamici-backend > /dev/null 2>&1; then
  pm2 reload backend/ecosystem.config.cjs --env production
else
  pm2 start backend/ecosystem.config.cjs --env production
fi
# Frontend
if pm2 describe triamici-frontend > /dev/null 2>&1; then
  pm2 reload frontend/ecosystem.config.cjs --env production
else
  pm2 start frontend/ecosystem.config.cjs --env production
fi

pm2 save

echo "==> Deploy concluído. Verifique: pm2 status && curl -s http://localhost:3001/api/health"
