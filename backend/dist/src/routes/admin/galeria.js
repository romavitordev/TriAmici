import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { createGaleriaFoto, deleteGaleriaFoto, listGaleria, updateGaleriaFoto } from '../../repositories/galeriaRepository.js';
import { galeriaSchema } from '../../schemas/depoimentoSchema.js';
const router = Router();
router.get('/', async (_req, res) => res.json(await listGaleria(true)));
router.post('/', validate(galeriaSchema), async (req, res) => res.status(201).json({ id: await createGaleriaFoto(req.body) }));
router.put('/:id', validate(galeriaSchema), async (req, res) => {
    await updateGaleriaFoto(req.params.id, req.body);
    res.status(204).send();
});
router.delete('/:id', async (req, res) => {
    await deleteGaleriaFoto(req.params.id);
    res.status(204).send();
});
export default router;
