import { z } from 'zod';

import { maxLength } from '../common/schema';

export const loginSchema = z.object({
    login: maxLength.min(1, 'Введите логин'),
    password: maxLength.min(1, 'Введите пароль'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
