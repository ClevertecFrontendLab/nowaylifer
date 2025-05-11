import { z } from 'zod';

import { maxLength, onlyCyrillic, startsWithCyrillic } from '../common/schema';

export const signUpSchema = z
    .object({
        firstName: z
            .string()
            .min(1, 'Введите имя')
            .pipe(startsWithCyrillic)
            .pipe(onlyCyrillic)
            .pipe(maxLength),
        lastName: z
            .string()
            .min(1, 'Введите фамилию')
            .pipe(startsWithCyrillic)
            .pipe(onlyCyrillic)
            .pipe(maxLength),
        email: z
            .string()
            .min(1, 'Введите e-mail')
            .email('Введите корректный e-mail')
            .pipe(maxLength),
        login: z
            .string()
            .min(1, 'Введите логин')
            .regex(/^[A-Za-z!@#$&_+.-]{5,}$/, 'Не соответствует формату')
            .pipe(maxLength),
        password: z
            .string()
            .min(1, 'Введите пароль')
            .regex(/^(?=.*?[A-Z])(?=.*?\d)[A-Za-z\d!@#$&_+.-]{8,}$/, 'Не соответствует формату')
            .pipe(maxLength),
        confirmPassword: z.string().min(1, 'Повторите пароль'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли должны совпадать',
        path: ['confirmPassword'],
    });

export const signUpSchemaKeys = signUpSchema.innerType().keyof().options;

export type SignUpSchema = z.infer<typeof signUpSchema>;
