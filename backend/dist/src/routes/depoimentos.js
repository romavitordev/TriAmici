import { Router } from 'express';
import { listDepoimentos } from '../repositories/depoimentoRepository.js';
const router = Router();
router.get('/', async (_req, res) => {
    res.json(await listDepoimentos(false));
});
export default router;
