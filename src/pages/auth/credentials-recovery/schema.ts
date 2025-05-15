import { z } from 'zod';

import { emailStrict, loginStrict, withPasswordStrictSchema } from '../common/schema';

export const recoverPasswordSchema = z.object({ email: emailStrict });

export type RecoverPasswordSchema = z.infer<typeof recoverPasswordSchema>;

export const resetPasswordSchema = withPasswordStrictSchema(z.object({ login: loginStrict }));

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
