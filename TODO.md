# TODO MASTER — TRI AMICI

> Última auditoria/execução: 2026-05-31
> Legenda: `[x]` concluído · `[~]` concluído no código, validação final depende de infraestrutura · `[ ]` pendente

## OBJETIVO PRINCIPAL

Finalizar a migração completa do projeto para produção em VPS Hostinger, garantindo:

* PostgreSQL funcional
* Resend funcional
* Build limpa
* Zero erros TypeScript
* Zero erros ESLint
* Frontend responsivo
* SEO configurado
* Deploy automatizado
* Commit e push realizados
* Sincronização entre TriAmici e layout_triamici

---

# FASE 1 — AUDITORIA DO PROJETO

* [x] Ler README.md
* [x] Ler TODO.md
* [x] Criar/Ler STATUS.md
* [x] Ler commits recentes
* [x] Executar git status
* [x] Identificar arquivos modificados
* [x] Verificar dependências instaladas (workspaces; NODE_ENV=production omitia devDeps)
* [x] Verificar package.json de frontend e backend

---

# FASE 2 — MIGRAÇÃO POSTGRESQL

## Dependências
* [x] Remover mssql
* [x] Instalar pg
* [x] Instalar @types/pg

## Banco
* [x] Confirmar que sqlserver.ts não é mais utilizado (server.ts importava `./database/sqlserver.js` — **corrigido** para postgres.js)
* [x] Confirmar que nenhum import restante referencia mssql
* [x] Remover `backend/.env` versionado com config SQL Server (DB_PORT 1433, user `sa`) — agora ignorado
* [x] Confirmar funcionamento de postgres.ts (suporta DATABASE_URL e variáveis individuais)

## Repositories
* [x] Validar leadRepository (queries parametrizadas $1.. / RETURNING)
* [x] Validar depoimentoRepository
* [x] Validar galeriaRepository

## Migrations
* [x] Migrations compatíveis com PostgreSQL (gen_random_uuid, TIMESTAMPTZ, CHECK)
* [~] Executar migrate (precisa de PostgreSQL acessível — `scripts/test-db.sh`)
* [~] Executar seed (seeds em 002/003; idempotentes via NOT EXISTS)

## Banco
* [~] Criar banco PostgreSQL local (pendente: infra)
* [x] Verificar índices (idx_leads_tipo, idx_leads_respondido, idx_depoimentos_ativo, idx_galeria_ativo)
* [x] Verificar UUIDs (DEFAULT gen_random_uuid())
* [x] Verificar constraints (CHECK em tipo, NOT NULL)

---

# FASE 3 — RESEND

* [x] Instalar resend
* [x] Reescrever mailer.ts (instanciação preguiçosa — não derruba o backend sem RESEND_API_KEY)
* [x] Remetente configurável via EMAIL_FROM (default onboarding@resend.dev até validar domínio)

## Validação
* [x] Confirmar compilação (typecheck + build OK)
* [x] Testar tratamento de erro (try/catch + retorno {sent,reason})
* [x] Testar ausência de RESEND_API_KEY (teste unitário `test/mailer.test.ts`)
* [~] Testar envio real / onboarding@resend.dev (pendente: chave Resend)

---

# FASE 4 — FRONTEND

## AudioPlayer
* [x] Tratamento de erro (onError → não renderiza, evita quebra). Replicado em layout_triamici.

## Mídias
* [x] Verificar arquivos em /public/midias (video_bg.mp4, logo.avif, camera_bg.png)
* [x] Verificar vídeo da hero
* [ ] jingle-triamici.mp3 ausente (fornecido pelo cliente — AudioPlayer tolera ausência)
* [x] Verificar imagens utilizadas (Unsplash + assets locais)

## Componentes
* [x] Hero / Header / Footer / Recursos / Galeria / Depoimentos / CTA / Curso / Sobre (build OK)

---

# FASE 5 — RESPONSIVIDADE MOBILE

* [x] Tipografia fluida (clamp) e densidade mobile no Hero (commits anteriores)
* [x] `overflow-x-hidden` no main; Hero com object-position mobile
* [x] Botões empilham no mobile (flex-col → sm:flex-row)
* [~] Validação pixel-perfect em 320/375/390/414/768/1024 (requer navegador/QA visual)

---

# FASE 6 — PERFORMANCE

* [x] Build de produção OK (First Load JS ~87 kB compartilhado)
* [x] next/image para imagens remotas; vídeo com preload/poster
* [~] Medir LCP/CLS/INP em produção (requer ambiente publicado)

---

# FASE 7 — SEO

* [x] title + template
* [x] description
* [x] Open Graph (home/curso/sobre/contato)
* [x] Twitter Card (summary_large_image)
* [x] sitemap (app/sitemap.ts → /sitemap.xml)
* [x] robots.txt (app/robots.ts → /robots.txt)
* [x] canonical (alternates.canonical por página; contato via layout dedicado)

---

# FASE 8 — TESTES AUTOMATIZADOS

* [x] scripts/test-backend.sh (typecheck + build + testes unitários)
* [x] scripts/test-api.sh (health/depoimentos/galeria/contato — contra instância viva)
* [x] scripts/test-db.sh (conexão + migrations + seed; pula com aviso se sem DB)
* [x] scripts/test-frontend.sh (typecheck + lint + build)
* [x] Testes unitários backend (node:test): schemas + mailer (8 testes, 8 passando)

---

# FASE 9 — QUALIDADE

* [x] frontend: lint OK (corrigido `react/no-unescaped-entities` em Depoimentos)
* [x] frontend: typecheck OK
* [x] frontend: build OK
* [x] backend: typecheck OK
* [x] backend: build OK
* [x] backend: test OK
* [x] Remover dependência não utilizada (jest)

---

# FASE 10 — VPS

* [x] ecosystem backend (cwd fixo, PORT 3001)
* [x] ecosystem frontend (cwd fixo, `npm start` — robusto com hoisting de workspaces)
* [x] nginx/triamici.conf (proxy / e /api)
* [x] scripts/deploy.sh (pull → install → migrate → build → PM2 reload → save) + chmod +x
* [~] Aplicar no VPS (pendente: infra Hostinger)

---

# FASE 11 — README

* [x] PostgreSQL / Resend / VPS / Deploy / PM2 / Nginx / SSL / Troubleshooting documentados
* [x] EMAIL_FROM e DATABASE_URL documentados

---

# FASE 12 — VALIDAÇÃO FINAL

* [x] Instalar dependências
* [x] Backend sobe sem DB/Resend (degradação graciosa, /api/health responde)
* [x] Testar API local (health 200/db:false, validação 400, 404, rotas DB 500 controlado)
* [~] Migrations + seed + envio de e-mail + produção (pendente: infra)

---

# FASE 13 — GIT

* [x] Atualizar TODO.md
* [x] Atualizar STATUS.md
* [x] Gerar relatório final
* [x] TriAmici: commit + push (branch claude/wizardly-ptolemy-Yl3zi)
* [x] layout_triamici: sincronizar + commit + push (branch claude/focused-franklin-Yl3zi)

---

# PENDÊNCIAS DE INFRAESTRUTURA (fora do código)

* [ ] Provisionar VPS Hostinger (Ubuntu 24)
* [ ] PostgreSQL de produção + rodar migrations/seed
* [ ] DNS do domínio triamici.com.br → VPS
* [ ] SSL (Certbot/Let's Encrypt)
* [ ] Validar domínio no Resend e trocar EMAIL_FROM para noreply@triamici.com.br
* [ ] PM2 startup/save no servidor
* [ ] QA visual de responsividade em dispositivos reais
* [ ] Substituir mídias/depoimentos placeholder (Unsplash) por fotos reais dos alunos
* [ ] Adicionar jingle-triamici.mp3 (fornecido pelo cliente)
