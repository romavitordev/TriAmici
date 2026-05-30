# Tri Amici Photography Academy

Monorepo full-stack para o novo site da Tri Amici Photography Academy, em Sorocaba, SP.

## Stack

- Frontend: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis e Swiper.
- Backend: Node.js 20, Express, TypeScript, SQL Server via `mssql`, Zod e Nodemailer.
- Banco: SQL Server 2022.

## Como rodar (sem Docker)

### Requisitos
- Ter um **SQL Server** rodando localmente e acessível.

### 1) Configurar ambiente (.env)
1. Crie um arquivo `.env` no **root** e/ou no **backend** (recomendado no `backend/`), com base no que o projeto espera (exatamente os nomes abaixo):

**Backend (exemplo de variáveis):**
- `PORT=3001`
- `CORS_ORIGIN=http://localhost:3000`
- `DB_SERVER=localhost`
- `DB_PORT=1433`
- `DB_NAME=triamici_db`
- `DB_USER=sa`
- `DB_PASSWORD=...`
- `SMTP_HOST=...`
- `SMTP_PORT=587`
- `SMTP_USER=...`
- `SMTP_PASS=...`
- `EMAIL_DESTINO=...`

No **frontend**, crie um `.env` (ou `.env.local`) com:
- `NEXT_PUBLIC_API_URL=http://localhost:3001`

> O backend carrega `.env` via `dotenv/config`.

### 2) Rodar migrations/seed (opcional, se precisar criar/normalizar tabelas)
```bash
cd backend
npm install
npm run migrate
npm run seed
```

### 3) Subir backend
```bash
cd backend
npm install
npm run build
npm start
```

O backend fica em: **http://localhost:3001/api**

### 4) Subir frontend
```bash
cd frontend
npm install
npm run dev
```
> Para rodar em modo produção: `npm run build` e depois `npm start`.

O frontend fica em: **http://localhost:3000**

## Mídias

Todos os arquivos de mídia (vídeo, imagens, áudio) ficam em `frontend/public/midias/`
e são servidos pela raiz `/midias/...` (ex.: `/midias/video_bg.mp4`).


## Rotas principais

- Site: `/`, `/sobre`, `/curso`, `/contato`
- API pública: `GET /api/health`, `GET /api/depoimentos`, `GET /api/galeria`, `POST /api/contato`

> Endpoints da API ficam em `http://localhost:3001/api`.

