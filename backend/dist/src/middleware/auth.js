import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
export function requireAuth(req, res, next) {
    const token = req.header('authorization')?.replace('Bearer ', '');
    if (!token)
        return res.status(401).json({ error: 'Token ausente' });
    try {
        req.admin = jwt.verify(token, config.jwtSecret);
        return next();
    }
    catch {
        return res.status(401).json({ error: 'Token invalido' });
    }
}
