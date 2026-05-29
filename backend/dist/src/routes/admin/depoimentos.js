import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { createDepoimento, deleteDepoimento, listDepoimentos, updateDepoimento } from '../../repositories/depoimentoRepository.js';
import { depoimentoSchema } from '../../schemas/depoimentoSchema.js';
const router = Router();
router.get('/', async (_req, res) => res.json(await listDepoimentos(true)));
router.post('/', validate(depoimentoSchema), async (req, res) => res.status(201).json({ id: await createDepoimento(req.body) }));
router.put('/:id', validate(depoimentoSchema), async (req, res) => {
    await updateDepoimento(req.params.id, req.body);
    res.status(204).send();
});
router.delete('/:id', async (req, res) => {
    await deleteDepoimento(req.params.id);
    res.status(204).send();
});
export default router;
