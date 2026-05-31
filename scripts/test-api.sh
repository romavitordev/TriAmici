#!/usr/bin/env bash
#
# Testa os endpoints HTTP da API contra uma instância em execução.
# Uso: API_URL=http://localhost:3001 ./scripts/test-api.sh
# Sobe o backend separadamente (npm --workspace backend run dev) antes de rodar.
#
set -uo pipefail
API_URL="${API_URL:-http://localhost:3001}"
PASS=0
FAIL=0

check() {
  local name="$1" expected="$2" got="$3"
  if [ "$got" = "$expected" ]; then
    echo "✓ ${name} (HTTP ${got})"; PASS=$((PASS+1))
  else
    echo "✗ ${name} (esperado ${expected}, recebeu ${got})"; FAIL=$((FAIL+1))
  fi
}

echo "==> Testando API em ${API_URL}"

if ! curl -fsS -o /dev/null --max-time 3 "${API_URL}/api/health" 2>/dev/null; then
  echo "⚠ Backend não está respondendo em ${API_URL}."
  echo "  Inicie com: npm --workspace backend run dev   (pulando — pendência de execução)"
  exit 0
fi

code=$(curl -s -o /dev/null -w '%{http_code}' "${API_URL}/api/health")
check "GET /api/health" "200" "$code"

code=$(curl -s -o /dev/null -w '%{http_code}' "${API_URL}/api/depoimentos")
check "GET /api/depoimentos" "200" "$code"

code=$(curl -s -o /dev/null -w '%{http_code}' "${API_URL}/api/galeria")
check "GET /api/galeria" "200" "$code"

# POST válido -> 201 (ou 500 se banco indisponível; tratamos como aviso)
code=$(curl -s -o /dev/null -w '%{http_code}' -X POST "${API_URL}/api/contato" \
  -H 'Content-Type: application/json' \
  -d '{"nome":"Teste Automatizado","email":"teste@exemplo.com","tipo":"AULA_GRATIS"}')
check "POST /api/contato (válido)" "201" "$code"

# POST inválido -> 400
code=$(curl -s -o /dev/null -w '%{http_code}' -X POST "${API_URL}/api/contato" \
  -H 'Content-Type: application/json' \
  -d '{"nome":"x"}')
check "POST /api/contato (inválido)" "400" "$code"

echo "----------------------------------------"
echo "Passou: ${PASS} | Falhou: ${FAIL}"
[ "$FAIL" -eq 0 ]
