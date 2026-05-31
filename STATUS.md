# STATUS — TRI AMICI

**Data:** 2026-05-31
**Branch (TriAmici):** `claude/wizardly-ptolemy-Yl3zi`
**Branch (layout_triamici):** `claude/focused-franklin-Yl3zi`

## Resumo executivo

O projeto está **pronto no nível de código** para produção. Backend (PostgreSQL +
Resend + API) e frontend (Next.js) compilam, passam em lint/typecheck e nos
testes automatizados. As pendências restantes são **exclusivamente de
infraestrutura** (VPS, PostgreSQL de produção, DNS, SSL e validação de domínio
no Resend), que não podem ser concluídas sem o ambiente externo.

## Validações executadas (offline)

| Verificação                  | Resultado |
|------------------------------|-----------|
| Backend — typecheck          | ✅ OK |
| Backend — build (tsc)        | ✅ OK |
| Backend — testes (node:test) | ✅ 8/8 |
| Backend — boot sem DB/Resend | ✅ degrada com elegância (`/api/health` responde) |
| API — health / 400 / 404     | ✅ OK |
| Frontend — typecheck         | ✅ OK |
| Frontend — lint              | ✅ OK |
| Frontend — build             | ✅ OK (gera /robots.txt e /sitemap.xml) |
| layout_triamici — typecheck  | ✅ OK |
| layout_triamici — lint       | ✅ OK |
| layout_triamici — build      | ✅ OK (static export) |

## Correções e melhorias aplicadas

- **[crítico]** `server.ts` importava `./database/sqlserver.js` (arquivo inexistente após a migração) → corrigido para `postgres.js`. Sem isso o backend **não compilava nem subia**.
- **[crítico]** `mailer.ts` instanciava `new Resend('')` no topo do módulo, lançando erro e **derrubando o backend** quando `RESEND_API_KEY` não estava definida → instanciação preguiçosa.
- **[segurança]** `backend/.env` versionado com credenciais de SQL Server (porta 1433, usuário `sa`, senha) → removido do controle de versão e `.gitignore` reforçado.
- Rotas `depoimentos`/`galeria` sem try/catch (Express 4 não captura rejeições async → request travava) → tratamento de erro adicionado (500 controlado).
- `/api/health` agora reporta status do banco, uptime e timestamp.
- Boot do servidor tolerante a falha de conexão + shutdown gracioso (SIGINT/SIGTERM).
- `EMAIL_FROM` configurável (default `onboarding@resend.dev` até validar domínio).
- SEO: `robots.ts`, `sitemap.ts`, Open Graph + Twitter Card + canonical em todas as páginas.
- ESLint configurado (`.eslintrc.json`) — `next lint` não interativo; corrigido `react/no-unescaped-entities`.
- Scripts `typecheck` adicionados (backend e frontend); `jest` (não usado) removido; testes via `node:test`.
- Scripts de validação: `scripts/test-backend.sh`, `test-frontend.sh`, `test-db.sh`, `test-api.sh`, `deploy.sh`.
- PM2 ecosystem robusto a hoisting de workspaces (cwd fixo; frontend via `npm start`).
- Sincronização layout_triamici: AudioPlayer (onError) + fix de lint, preservando config de GitHub Pages (basePath/export).

## Pendências de infraestrutura (bloqueiam apenas a validação final)

- VPS Hostinger (Ubuntu 24) não provisionada.
- PostgreSQL de produção indisponível → migrations/seed não executados de verdade.
- DNS de `triamici.com.br` não apontado.
- SSL (Certbot) não emitido.
- Domínio não validado no Resend → envio real de e-mail não testado.
- QA visual de responsividade em dispositivos reais.
- Mídias placeholder (Unsplash) e `jingle-triamici.mp3` a serem fornecidos pelo cliente.

## Como retomar quando a infra existir

```bash
# 1. No VPS, após clonar e configurar backend/.env (ver .env.production.example):
npm install --include=dev
npm --workspace backend run migrate     # cria tabelas + seeds
./scripts/test-db.sh                     # valida conexão/migrations/seed

# 2. Subir e validar:
./scripts/deploy.sh                      # build + PM2
API_URL=http://localhost:3001 ./scripts/test-api.sh
```
