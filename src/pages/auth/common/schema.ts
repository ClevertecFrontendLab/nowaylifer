import { z } from 'zod';

export const maxLength = z.string().max(50, 'Максимальная длина 50 символов');
export const onlyCyrillic = z.string().regex(/^[а-яё-]+$/iu, 'Только кириллица А-Я, и "-"');
export const startsWithCyrillic = z
    .string()
    .regex(/^[а-яё]/iu, 'Должно начинаться с кириллицы А-Я');

export const emailStrict = z
    .string()
    .min(1, 'Введите e-mail')
    .email('Введите корректный e-mail')
    .pipe(maxLength);

export const loginStrict = z
    .string()
    .min(1, 'Введите логин')
    .regex(/^[A-Za-z!@#$&_+.-]{5,}$/, 'Не соответствует формату')
    .pipe(maxLength);

const passwordStrictSchema = z.object({
    password: z
        .string()
        .min(1, 'Введите пароль')
        .regex(/^(?=.*?[A-Z])(?=.*?\d)[A-Za-z\d!@#$&_+.-]{8,}$/, 'Не соответствует формату')
        .pipe(maxLength),
    passwordConfirm: z.string().min(1, 'Повторите пароль'),
});

export const withPasswordStrictSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
    passwordStrictSchema.merge(schema).refine((data) => data.password === data.passwordConfirm, {
        message: 'Пароли должны совпадать',
        path: ['passwordConfirm'],
    });
