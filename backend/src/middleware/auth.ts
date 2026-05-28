import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'

export interface AuthRequest extends Request {
  admin?: { id: string; email: string }
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.header('authorization')?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Token ausente' })

  try {
    req.admin = jwt.verify(token, config.jwtSecret) as { id: string; email: string }
    return next()
  } catch {
    return res.status(401).json({ error: 'Token invalido' })
  }
}
