import { z } from 'zod';

import { maxLength } from '../common/schema';

export const loginSchema = z.object({
    login: z.string().min(1, 'Введите логин').pipe(maxLength),
    password: z.string().min(1, 'Введите пароль').pipe(maxLength),
});
