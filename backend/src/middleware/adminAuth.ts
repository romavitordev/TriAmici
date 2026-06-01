import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'

const COOKIE_NAME = 'ta_admin_session'

export function adminLogin(req: Request, res: Response) {
  const { user, password } = req.body as { user?: string; password?: string }
  if (
    !user || !password ||
    user !== config.admin.user ||
    password !== config.admin.password
  ) {
    return res.status(401).json({ error: 'Credenciais inválidas' })
  }

  const token = jwt.sign({ role: 'admin' }, config.admin.jwtSecret, {
    expiresIn: '24h',
  })

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  })
  return res.json({ ok: true })
}

export function adminLogout(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME)
  res.json({ ok: true })
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return res.status(401).json({ error: 'Não autenticado' })
  try {
    jwt.verify(token, config.admin.jwtSecret)
    return next()
  } catch {
    res.clearCookie(COOKIE_NAME)
    return res.status(401).json({ error: 'Sessão expirada' })
  }
}
