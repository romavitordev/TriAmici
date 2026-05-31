#!/usr/bin/env bash
#
# Valida o frontend: typecheck, lint e build de produção.
#
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "==> [frontend] typecheck"
npm --workspace frontend run typecheck

echo "==> [frontend] lint"
npm --workspace frontend run lint

echo "==> [frontend] build"
npm --workspace frontend run build

echo "✓ Frontend OK"
