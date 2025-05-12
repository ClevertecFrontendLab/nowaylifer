import { z } from 'zod';

import { emailStrict, loginStrict, withPasswordStrictSchema } from '../common/schema';

export const recoverPasswordSchema = z.object({ email: emailStrict });

export const resetPasswordSchema = withPasswordStrictSchema(z.object({ login: loginStrict }));
