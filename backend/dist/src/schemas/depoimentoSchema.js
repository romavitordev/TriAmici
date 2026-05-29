import { z } from 'zod';
export const depoimentoSchema = z.object({
    nome: z.string().min(2).max(200),
    turma: z.string().max(100).optional().nullable(),
    texto: z.string().min(5).max(4000),
    foto: z.string().url().max(500).optional().nullable(),
    ativo: z.boolean().default(true),
    ordem: z.number().int().min(0).default(0)
});
export const galeriaSchema = z.object({
    url: z.string().url().max(500),
    legenda: z.string().max(300).optional().nullable(),
    aluno: z.string().max(200).optional().nullable(),
    ativo: z.boolean().default(true)
});
