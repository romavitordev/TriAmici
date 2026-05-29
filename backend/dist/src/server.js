import express from 'express';
import morgan from 'morgan';
import { config } from './config/index.js';
import { connectDB } from './database/sqlserver.js';
import { corsMiddleware } from './middleware/cors.js';
import routes from './routes/index.js';
const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(morgan(config.env === 'production' ? 'combined' : 'dev'));
app.use(corsMiddleware);
app.use('/api', routes);
app.use((_req, res) => res.status(404).json({ error: 'Rota nao encontrada' }));
app.listen(config.port, async () => {
    await connectDB();
    console.log(`Backend rodando na porta ${config.port}`);
});
