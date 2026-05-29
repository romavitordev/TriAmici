import { Router } from 'express';
import { sendNotification } from '../email/mailer.js';
import { contactRateLimit } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';
import { createLead } from '../repositories/leadRepository.js';
import { leadSchema } from '../schemas/leadSchema.js';
const router = Router();
router.post('/', contactRateLimit, validate(leadSchema), async (req, res) => {
    try {
        const { empresa, ...lead } = req.body;
        const id = await createLead(lead);
        sendNotification(lead).catch((error) => console.error('mail_error', error));
        res.status(201).json({ id });
    }
    catch (error) {
        console.error('create_lead_error', error);
        res.status(500).json({ error: 'Erro interno' });
    }
});
export default router;
