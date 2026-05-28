import cors from 'cors'
import { config } from '../config/index.js'

export const corsMiddleware = cors({
  origin: config.env === 'production' ? config.corsOrigin.split(',') : true,
  credentials: true
})
