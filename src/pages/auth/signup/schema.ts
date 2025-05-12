import { z } from 'zod';

import {
    emailStrict,
    loginStrict,
    maxLength,
    onlyCyrillic,
    startsWithCyrillic,
    withPasswordStrictSchema,
} from '../common/schema';

export const signUpSchema = withPasswordStrictSchema(
    z.object({
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
        email: emailStrict,
        login: loginStrict,
    }),
);

export const signUpSchemaKeys = signUpSchema.innerType().keyof().options;

export type SignUpSchema = z.infer<typeof signUpSchema>;
