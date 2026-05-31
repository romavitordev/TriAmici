#!/usr/bin/env bash
#
# Valida o backend sem depender de infraestrutura externa:
# typecheck, build e testes unitários (schemas + mailer).
#
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "==> [backend] typecheck"
npm --workspace backend run typecheck

echo "==> [backend] build"
npm --workspace backend run build

echo "==> [backend] testes unitários"
npm --workspace backend test

echo "✓ Backend OK"
