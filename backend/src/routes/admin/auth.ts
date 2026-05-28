import bcrypt from 'bcryptjs'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../../config/index.js'
import { validate } from '../../middleware/validate.js'
import { findAdminByEmail } from '../../repositories/adminRepository.js'
import { loginSchema } from '../../schemas/authSchema.js'

const router = Router()

router.post('/login', validate(loginSchema), async (req, res) => {
  const admin = await findAdminByEmail(req.body.email)
  if (!admin) return res.status(401).json({ error: 'Credenciais invalidas' })

  const ok = await bcrypt.compare(req.body.senha, admin.senha)
  if (!ok) return res.status(401).json({ error: 'Credenciais invalidas' })

  const token = jwt.sign({ id: admin.id, email: admin.email }, config.jwtSecret, { expiresIn: '8h' })
  return res.json({ token, admin: { id: admin.id, email: admin.email } })
})

export default router
