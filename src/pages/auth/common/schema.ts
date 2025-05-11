import { z } from 'zod';

export const maxLength = z.string().max(50, 'Максимальная длина 50 символов');
export const onlyCyrillic = z.string().regex(/^[а-яё-]+$/iu, 'Только кириллица А-Я, и "-"');
export const startsWithCyrillic = z
    .string()
    .regex(/^[а-яё]/iu, 'Должно начинаться с кириллицы А-Я');
