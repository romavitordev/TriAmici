# TODO MASTER — TRI AMICI

## OBJETIVO PRINCIPAL

Finalizar a migração completa do projeto para produção em VPS Hostinger, garantindo:

* PostgreSQL funcional
* Resend funcional
* Build limpa
* Zero erros Typescript
* Zero erros ESLint
* Frontend responsivo
* SEO configurado
* Deploy automatizado
* Commit e push realizados
* Sincronização entre TriAmici e layout_triamici

---

# FASE 1 — AUDITORIA DO PROJETO

Antes de qualquer alteração:

* [ ] Ler README.md
* [ ] Ler TODO.md
* [ ] Ler STATUS.md (se existir)
* [ ] Ler commits recentes
* [ ] Executar git status
* [ ] Identificar arquivos modificados
* [ ] Verificar dependências instaladas
* [ ] Verificar package.json de frontend e backend

Gerar relatório inicial.

---

# FASE 2 — MIGRAÇÃO POSTGRESQL

## Dependências

* [x] Remover mssql
* [x] Instalar pg
* [x] Instalar @types/pg

## Banco

* [ ] Confirmar que sqlserver.ts não é mais utilizado
* [ ] Confirmar que nenhum import restante referencia mssql
* [ ] Confirmar funcionamento de postgres.ts

## Repositories

* [ ] Validar leadRepository
* [ ] Validar depoimentoRepository
* [ ] Validar galeriaRepository

## Migrations

* [ ] Executar migrate
* [ ] Executar seed
* [ ] Corrigir incompatibilidades SQL

## Banco

* [ ] Criar banco PostgreSQL local
* [ ] Verificar índices
* [ ] Verificar UUIDs
* [ ] Verificar constraints

---

# FASE 3 — RESEND

* [x] Instalar resend
* [x] Reescrever mailer.ts

## Validação

* [ ] Confirmar compilação
* [ ] Testar envio de e-mail
* [ ] Testar tratamento de erro
* [ ] Testar ausência de RESEND_API_KEY
* [ ] Testar [onboarding@resend.dev](mailto:onboarding@resend.dev)

---

# FASE 4 — FRONTEND

## AudioPlayer

* [x] Tratamento de erro

## Mídias

* [ ] Verificar existência de todos os arquivos em /public/midias
* [ ] Verificar vídeo da hero
* [ ] Verificar jingle-triamici.mp3
* [ ] Verificar imagens utilizadas

## Componentes

* [ ] Hero
* [ ] Header
* [ ] Footer
* [ ] Recursos
* [ ] Galeria
* [ ] Depoimentos
* [ ] CTA
* [ ] Curso
* [ ] Sobre

---

# FASE 5 — RESPONSIVIDADE MOBILE

Analisar:

* [ ] 320px
* [ ] 375px
* [ ] 390px
* [ ] 414px
* [ ] 768px
* [ ] 1024px

## Hero

* [ ] Verificar espaçamentos
* [ ] Verificar vídeo
* [ ] Verificar CTA
* [ ] Verificar legibilidade

## Geral

* [ ] Verificar overflow horizontal
* [ ] Verificar quebras de texto
* [ ] Verificar grids
* [ ] Verificar botões
* [ ] Verificar navegação

Corrigir tudo que prejudicar UX.

---

# FASE 6 — PERFORMANCE

## Frontend

* [ ] Executar build
* [ ] Verificar bundle
* [ ] Verificar imagens
* [ ] Verificar vídeos
* [ ] Verificar lazy loading

## Core Web Vitals

* [ ] Melhorar LCP
* [ ] Melhorar CLS
* [ ] Melhorar INP

---

# FASE 7 — SEO

Verificar:

* [ ] title
* [ ] description
* [ ] Open Graph
* [ ] Twitter Card
* [ ] sitemap
* [ ] robots.txt
* [ ] canonical

Páginas:

* [ ] Home
* [ ] Curso
* [ ] Sobre

---

# FASE 8 — TESTES AUTOMATIZADOS

Criar scripts executáveis.

## Backend

* [ ] scripts/test-backend.sh
* [ ] scripts/test-api.sh

Validar:

* [ ] GET /api/health
* [ ] GET /api/depoimentos
* [ ] GET /api/galeria
* [ ] POST /api/contato

## Banco

* [ ] scripts/test-db.sh

Validar:

* [ ] conexão
* [ ] migrations
* [ ] seed

## Frontend

* [ ] scripts/test-frontend.sh

Validar:

* [ ] build
* [ ] typecheck
* [ ] lint

---

# FASE 9 — QUALIDADE

Executar:

* [ ] npm run lint
* [ ] npm run build
* [ ] npm run typecheck

Frontend e Backend.

Corrigir:

* [ ] warnings
* [ ] erros
* [ ] imports mortos
* [ ] dependências não utilizadas

---

# FASE 10 — VPS

## PM2

* [ ] Validar ecosystem backend
* [ ] Validar ecosystem frontend

## Nginx

* [ ] Validar nginx.conf
* [ ] Validar proxy frontend
* [ ] Validar proxy backend

## Deploy

* [ ] Validar deploy.sh
* [ ] Validar chmod +x

---

# FASE 11 — README

Confirmar:

* [ ] PostgreSQL
* [ ] Resend
* [ ] VPS
* [ ] Deploy
* [ ] PM2
* [ ] Nginx
* [ ] SSL
* [ ] Troubleshooting

---

# FASE 12 — VALIDAÇÃO FINAL

Executar sequência completa:

1. Instalar dependências
2. Rodar migrations
3. Rodar seeds
4. Subir backend
5. Subir frontend
6. Testar API
7. Testar páginas
8. Testar envio de e-mail
9. Testar responsividade
10. Testar produção

Corrigir qualquer erro encontrado.

Repetir até tudo funcionar.

---

# FASE 13 — GIT

Quando tudo estiver validado:

* [ ] Atualizar TODO.md
* [ ] Atualizar STATUS.md
* [ ] Gerar relatório final

## Repositório TriAmici

* [ ] Commit
* [ ] Push

## Repositório layout_triamici

* [ ] Sincronizar alterações
* [ ] Commit
* [ ] Push

---

# CRITÉRIO DE CONCLUSÃO

A tarefa só pode ser considerada concluída quando:

* PostgreSQL funcionando
* Resend funcionando
* Backend compilando
* Frontend compilando
* API validada
* Responsividade validada
* SEO validado
* Deploy validado
* README atualizado
* TODO atualizado
* Commits realizados
* Push realizado nos dois repositórios
* Relatório final gerado
