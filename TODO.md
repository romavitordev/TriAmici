# TODO (Tri Amici)

## Concluído
- [x] Remover `docker-compose.yml`, `backend/Dockerfile`, `frontend/Dockerfile`
- [x] Ajustar `Makefile` removendo targets `docker-compose`
- [x] Atualizar `README.md` para rodar backend em `localhost:3001` sem Docker
- [x] Remover remanescentes de admin (`frontend/lib/auth.ts`, `backend/src/schemas/authSchema.ts`, deps `jsonwebtoken`/`bcryptjs`)
- [x] Remover build versionado (`backend/dist`) e adicioná-lo ao `.gitignore`
- [x] Corrigir fallback de URL da API (`8080` → `3001`) em `frontend/lib/api.ts`
- [x] Consolidar mídias em `frontend/public/midias/` e atualizar os caminhos

## Pendências principais (prioridade alta → baixa)

1) Migrar banco de SQL Server → PostgreSQL (backend)
	- [ ] Remover dependência `mssql` e instalar `pg` e `@types/pg` (dev)
	- [ ] Criar `src/database/postgres.ts` e remover/retirar `src/database/sqlserver.ts`
	- [ ] Atualizar `src/config/index.ts` (porta 5432, usuário `postgres`, `resendApiKey`)
	- [ ] Reescrever queries nos repositories: `leadRepository.ts`, `depoimentoRepository.ts`, `galeriaRepository.ts` (mssql → pg; usar $1,$2... e RETURNING)
	- [ ] Reescrever migrations em `backend/migrations/` para sintaxe PostgreSQL (substituir arquivos existentes)
	- [ ] Atualizar `backend/scripts/migrate.ts` para usar `pg` (Pool) e executar os .sql
	- [ ] Testar localmente: criar DB, rodar `npm run migrate` e `npm run seed`

2) Trocar Nodemailer por Resend (envio de e-mail)
	- [ ] Remover `nodemailer` e tipos
	- [ ] Instalar `resend` e configurar `config.resendApiKey`
	- [ ] Reescrever `src/email/mailer.ts` para usar `Resend` (nota: usar onboarding@resend.dev enquanto domínio não verificado)

3) Correções pontuais (frontend/back)
	- [ ] AudioPlayer: adicionar tratamento de erro quando o arquivo de áudio está ausente (`onError` → ocultar player)
	- [ ] Adicionar `frontend/public/midias/jingle-triamici.mp3` (arquivo fornecido pelo cliente)
	- [ ] Seeds (002, 003): inserir comentário claro que URLs do Unsplash são placeholders e devem ser substituídos antes da produção

4) Preparar deploy em VPS (Nginx + PM2)
	- [ ] Adicionar `backend/ecosystem.config.cjs` (processo `triamici-backend` apontando para `dist/src/server.js`)
	- [ ] Adicionar `frontend/ecosystem.config.cjs` (processo `triamici-frontend` com `next start`)
	- [ ] Adicionar `nginx/triamici.conf` (reverse proxy frontend:3000, backend:3001)
	- [ ] Adicionar `scripts/deploy.sh` (pull, install, build, migrate, pm2 restart/start) e instruir `chmod +x` no README
	- [ ] Criar `backend/.env.production.example` e `frontend/.env.production.example`

5) Documentação e validação final
	- [x] Atualizar `README.md` com instruções de PostgreSQL, Resend e deploy (substituído)
	- [ ] Validar endpoints: `GET /api/health`, `GET /api/depoimentos`, `GET /api/galeria`, `POST /api/contato`
	- [ ] Testar envio de e-mail via Resend em ambiente de desenvolvimento
	- [ ] Rodar frontend e validar componentes (especialmente `AudioPlayer`, `Galeria`, `Depoimentos`)

6) Commit, push e deploy
	- [ ] Commitar mudanças no repositório monorepo `triamici` (branch main ou branch de feature)
	- [ ] Push para GitHub remoto `triamici`
	- [ ] Se houver repositório separado `layout_triamici` contendo apenas frontend layout, sincronizar/atualizar com as mídias e pushes correspondentes
	- [ ] Executar o script `./scripts/deploy.sh` no servidor (após configurar .env de produção e PM2/Nginx)

Observações:
- Não alterar a estrutura de pastas, rotas, middleware ou schemas Zod.
- Antes de alterações no banco, faça backup do banco existente (se aplicável).
- Seeds contêm placeholders de imagens: substituir antes de produção.

Se quiser, posso implementar os arquivos de migração e as alterações no backend agora; quer que eu prossiga com a Tarefa 1 (PostgreSQL)?
