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
```

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
│   ├── public/midias/    # Vídeo, áudio, imagens estáticas
│   ├── src/
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

Se quiser que eu aplique automaticamente as mudanças (migrations, `src/database/postgres.ts`, `src/email/mailer.ts`, updates nos repositories e scripts), autorizo a proceder. Caso prefira, posso gerar os patches passo a passo para revisão.

