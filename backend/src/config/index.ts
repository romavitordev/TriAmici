import 'dotenv/config'

const numberFromEnv = (value: string | undefined, fallback: number) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: numberFromEnv(process.env.PORT, 3001),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  resendApiKey: process.env.RESEND_API_KEY ?? '',
  db: {
    user:     process.env.DB_USER     ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    server:   process.env.DB_SERVER   ?? 'localhost',
    name:     process.env.DB_NAME     ?? 'triamici_db',
    port:     numberFromEnv(process.env.DB_PORT, 5432),
  },
  smtp: {
    destino: process.env.EMAIL_DESTINO ?? 'escola@triamici.com.br',
    // Remetente. Enquanto o domínio não estiver verificado no Resend,
    // use o remetente de testes 'onboarding@resend.dev' (default).
    from: process.env.EMAIL_FROM ?? 'Tri Amici Site <onboarding@resend.dev>',
  },
}
