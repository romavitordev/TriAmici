# TODO (Tri Amici)

## Concluído
- [x] Remover `docker-compose.yml`, `backend/Dockerfile`, `frontend/Dockerfile`
- [x] Ajustar `Makefile` removendo targets `docker-compose`
- [x] Atualizar `README.md` para rodar backend em `localhost:3001` sem Docker
- [x] Remover remanescentes de admin (`frontend/lib/auth.ts`, `backend/src/schemas/authSchema.ts`, deps `jsonwebtoken`/`bcryptjs`)
- [x] Remover build versionado (`backend/dist`) e adicioná-lo ao `.gitignore`
- [x] Corrigir fallback de URL da API (`8080` → `3001`) em `frontend/lib/api.ts`
- [x] Consolidar mídias em `frontend/public/midias/` e atualizar os caminhos

## Pendente
- [ ] Validar endpoint: `GET http://localhost:3001/api/health`
- [ ] Validar rotas públicas (`/api/contato`, `/api/galeria`, `/api/depoimentos`)
- [ ] Adicionar o áudio `jingle-triamici.mp3` em `frontend/public/midias/` (referenciado no `AudioPlayer`, mas o arquivo não existe ainda)
