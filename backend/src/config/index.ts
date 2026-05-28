import 'dotenv/config'

const numberFromEnv = (value: string | undefined, fallback: number) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: numberFromEnv(process.env.PORT, 3001),

  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',

  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
  db: {
    user: process.env.DB_USER ?? 'sa',
    password: process.env.DB_PASSWORD ?? '',
    server: process.env.DB_SERVER ?? 'localhost',
    name: process.env.DB_NAME ?? 'triamici_db',
    port: numberFromEnv(process.env.DB_PORT, 1433)
  },
  smtp: {
    host: process.env.SMTP_HOST ?? '',
    port: numberFromEnv(process.env.SMTP_PORT, 587),
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
    destino: process.env.EMAIL_DESTINO ?? 'escola@triamici.com.br'
  },
  admin: {
    email: process.env.ADMIN_EMAIL ?? 'admin@triamici.com.br',
    senhaInicial: process.env.ADMIN_SENHA_INICIAL ?? 'MudeSuaSenha@2026'
  }
}
