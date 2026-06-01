# Tri Amici Photography Academy

Site institucional da Tri Amici Photography Academy — Sorocaba, SP.

## Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis, Swiper
- **Backend:** Node.js 20, Express, TypeScript, Zod, Resend
- **Banco:** PostgreSQL 15+
- **Produção:** VPS Ubuntu 24, Nginx, PM2

---

## Desenvolvimento local

### Requisitos
- Node.js 20+
- PostgreSQL 15+ rodando localmente
- Conta no Resend (https://resend.com) com API Key (para envio de e-mails)

### 1. Clonar e instalar
```bash
git clone https://github.com/romavitordev/TriAmici.git
cd TriAmici
npm install
```

### 2. Configurar variáveis de ambiente
Crie `backend/.env` com base em `backend/.env.example`:
```
PORT=3001
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
# Banco de dados (PostgreSQL)
DB_SERVER=localhost
DB_PORT=5432
DB_NAME=triamici_db
DB_USER=postgres
DB_PASSWORD=sua_senha
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_DESTINO=voce@exemplo.com
# Remetente: enquanto o dominio nao estiver validado no Resend, use o sender de testes
EMAIL_FROM=Tri Amici Site <onboarding@resend.dev>
# Admin (painel de pré-inscrições — autenticação por cookie JWT, sem banco de usuários)
ADMIN_USER=triamici_admin
ADMIN_PASSWORD=senha_forte_aqui
JWT_SECRET=string_aleatoria_de_64_caracteres
```

> Gere um `JWT_SECRET` seguro com:
> `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

> Alternativa ao bloco `DB_*`: defina uma única `DATABASE_URL=postgres://user:pass@host:5432/db` (tem prioridade).
> Sem `RESEND_API_KEY` o backend **sobe normalmente** — apenas não envia e-mails (registra o motivo no log).

Crie `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Criar banco e rodar migrations
Crie o banco no PostgreSQL antes:
```bash
# Exemplo: usando o usuário postgres
psql -U postgres -c "CREATE DATABASE triamici_db;"
cd backend
npm run migrate   # cria tabelas
npm run seed      # insere dados de exemplo (opcional)
```

### 4. Subir backend
```bash
cd backend
npm run dev
```
# Disponível em: http://localhost:3001/api

### 5. Subir frontend
```bash
cd frontend
npm run dev
```
# Disponível em: http://localhost:3000

---

## Rotas da API
| Método | Rota               | Descrição                        |
|--------|--------------------|----------------------------------|
| GET    | /api/health        | Health check                     |
| GET    | /api/depoimentos   | Lista depoimentos ativos         |
| GET    | /api/galeria       | Lista fotos da galeria ativas    |
| POST   | /api/contato       | Cria lead e envia notificação    |
| POST   | /api/pre-inscricao | Cria pré-inscrição + notifica    |
| POST   | /api/admin/login   | Login do painel (cookie JWT)     |
| GET    | /api/admin/pre-inscricoes        | Lista pré-inscrições (auth) |
| PATCH  | /api/admin/pre-inscricoes/:id/status | Atualiza status (auth) |
| GET    | /api/admin/pre-inscricoes/export/csv | Exporta CSV (auth)     |

### Payload do POST /api/contato
```
{
	"nome": "João Silva",
	"email": "joao@exemplo.com",
	"telefone": "(15) 99999-9999",
	"mensagem": "Tenho interesse na aula experimental.",
	"tipo": "AULA_GRATIS"
}
```
tipo aceita "CONTATO" ou "AULA_GRATIS".

---

## Conteúdo gerenciado fora do painel

Por decisão de produto, **depoimentos e galeria de fotos** NÃO são editáveis pelo
painel admin. São gerenciados manualmente pelo responsável técnico (parte do plano
mensal de manutenção/conteúdo).

### Como atualizar depoimentos
1. Edite `backend/migrations/002_seed_depoimentos.sql` com os novos textos/fotos/turmas.
2. Em produção, aplique direto no banco — uma forma simples:
   ```bash
   # ATENÇÃO: substitui todos os depoimentos atuais
   psql "$DATABASE_URL" -c "DELETE FROM depoimentos;"
   psql "$DATABASE_URL" -f backend/migrations/002_seed_depoimentos.sql
   ```
3. O frontend atualiza na próxima visita (cache `no-store`).

### Como atualizar galeria
Mesmo fluxo, em `backend/migrations/003_seed_galeria.sql`.

> Painel admin é exclusivo para **pré-inscrições** (Aula Zero/admissão).

---

## Qualidade e testes
Scripts de validação (a partir da raiz do projeto):
```bash
./scripts/test-backend.sh    # typecheck + build + testes unitarios do backend
./scripts/test-frontend.sh   # typecheck + lint + build do frontend
./scripts/test-db.sh         # conexao + migrations + seed (pula com aviso se nao houver PostgreSQL)
API_URL=http://localhost:3001 ./scripts/test-api.sh   # testa os endpoints contra uma instancia viva
```
Comandos por workspace:
```bash
npm --workspace backend run typecheck   # tsc --noEmit
npm --workspace backend test            # node:test (schemas + mailer)
npm --workspace frontend run lint        # next lint
npm --workspace frontend run typecheck   # tsc --noEmit
```

---

## Pré-inscrição (Aula Gratuita)
A página pública **`/aula-gratuita`** reconstrói, com a identidade da escola, o formulário
de admissão do Google Forms: dados pessoais, perfil fotográfico e o "vestibular" de
sensibilidade artística (4 perguntas abertas, incluindo a leitura do quadro *Nighthawks*,
de Edward Hopper). Cada envio cria um registro em `pre_inscricoes` e dispara um e-mail de
notificação (Resend) para a escola. Os botões "Aula grátis / aula gratuita" do site público
apontam para esta página (a rota `/contato` segue para contato geral).

## Painel Administrativo
- **URL:** `[domínio]/admin` — **não linkado** em nenhuma parte do site público.
- **Acesso:** configure `ADMIN_USER`, `ADMIN_PASSWORD` e `JWT_SECRET` no `.env` do backend.
  Autenticação por cookie HTTP-only (JWT, 24h), sem banco de usuários. As rotas `/admin/*`
  são protegidas por middleware do Next (redireciona para `/admin/login` sem sessão).
- **Funcionalidades:**
  - Listar pré-inscrições e filtrar por status (Pendentes / Contactadas / Rejeitadas) com contadores.
  - Ver detalhes completos, incluindo as 4 respostas do vestibular.
  - "Chamar no WhatsApp" — abre `wa.me` com mensagem pré-formatada e marca como *contactado* automaticamente.
  - Marcar status manualmente (pendente / contactado / rejeitado) e adicionar notas.
  - Exportar todas as pré-inscrições em **CSV** (com BOM UTF-8, abre direto no Excel).

## Mídias
Todos os arquivos de mídia ficam em `frontend/public/midias/` e são servidos em `/midias/...`.
Arquivos esperados:
- `video_bg.mp4` — vídeo de fundo da home
- `jingle-triamici.mp3` — jingle da escola (fornecido pelo cliente)

---

## Deploy em VPS (produção)
### Infraestrutura
- **VPS:** Hostinger KVM1 — Ubuntu 24, 4 GB RAM
- **Servidor web:** Nginx (proxy reverso)
- **Gerenciador de processos:** PM2
- **Banco:** PostgreSQL instalado localmente no VPS
- **SSL:** Certbot (Let's Encrypt)

### Setup inicial do VPS (uma vez só)
```bash
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Instalar PM2 globalmente
sudo npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx

# Criar banco de dados e usuário (exemplo)
sudo -u postgres psql -c "CREATE DATABASE triamici_db;"
sudo -u postgres psql -c "CREATE USER triamici WITH PASSWORD 'SENHA_FORTE';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE triamici_db TO triamici;"

# Clonar o projeto
git clone https://github.com/romavitordev/TriAmici.git /var/www/triamici
cd /var/www/triamici

# Copiar .env de produção e editar
cp backend/.env.production.example backend/.env
nano backend/.env
cp frontend/.env.production.example frontend/.env.production.local
nano frontend/.env.production.local

# Configurar Nginx
sudo cp nginx/triamici.conf /etc/nginx/sites-available/triamici
sudo ln -s /etc/nginx/sites-available/triamici /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL com Certbot (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d triamici.com.br -d www.triamici.com.br

# Primeiro deploy
chmod +x scripts/deploy.sh
./scripts/deploy.sh

# Salvar PM2 para reiniciar automaticamente após reboot
pm2 save
pm2 startup
```

### Deploys subsequentes
```bash
cd /var/www/triamici
./scripts/deploy.sh
```

---

## Estrutura do projeto
TriAmici/
├── backend/
│   ├── migrations/       # SQL de criação de tabelas e seeds
│   ├── scripts/          # migrate.ts, seed.ts
│   ├── src/
│   │   ├── config/       # Variáveis de ambiente
│   │   ├── database/     # Conexão PostgreSQL
│   │   ├── email/        # Integração Resend
│   │   ├── middleware/   # CORS, rate limit, validação
│   │   ├── repositories/ # Queries SQL
│   │   ├── routes/       # Endpoints Express
│   │   ├── schemas/      # Validação Zod
│   │   └── server.ts
│   └── ecosystem.config.cjs
├── frontend/
│   ├── app/              # Rotas (App Router): /, /curso, /sobre, /contato, robots.ts, sitemap.ts
│   ├── components/       # layout/, sections/, ui/
│   ├── lib/              # api.ts, validations.ts, easings.ts
│   ├── public/midias/    # Vídeo, áudio, imagens estáticas
│   └── ecosystem.config.cjs
├── nginx/
│   └── triamici.conf     # Config Nginx para produção
└── scripts/
		└── deploy.sh         # Script de deploy automatizado

---

## Ordem de execução das tarefas (recomendada)
1. Migrar para PostgreSQL (fundação)
2. Implementar Resend (e-mail)
3. Correções pontuais (frontend)
4. Preparar arquivos de deploy (PM2, Nginx, deploy.sh)
5. Atualizar a documentação e validar tudo localmente

---

## Troubleshooting

| Sintoma | Causa provável | Solução |
|---------|----------------|---------|
| `Cannot find module './database/sqlserver.js'` | Resquício da migração mssql→pg | Já corrigido (`server.ts` importa `postgres.js`). |
| `Missing API key` ao subir o backend | `RESEND_API_KEY` vazia em versão antiga do mailer | Já corrigido (cliente Resend instanciado de forma preguiçosa). |
| devDependencies não instaladas (`tsc`/`tsx`/`@types` ausentes) | `NODE_ENV=production` faz o npm omitir devDeps | `NODE_ENV=development npm install --include=dev`. |
| `next lint` abre prompt interativo | ESLint não configurado | Já incluso `.eslintrc.json` (`next/core-web-vitals`). |
| `/api/depoimentos` e `/api/galeria` retornam 500 | PostgreSQL indisponível | Suba o banco e rode `npm run migrate` (veja `/api/health` → `db:false`). |
| E-mail não chega | Domínio não validado no Resend | Use `EMAIL_FROM=...<onboarding@resend.dev>` até validar o domínio. |
| `pm2` não encontra o binário do Next | Hoisting de workspaces | Os `ecosystem.config.cjs` já usam `cwd` fixo e `npm start`. |

---

> **Estado atual:** veja `STATUS.md` (validações executadas) e `TODO.md` (pendências, incluindo as de infraestrutura).

