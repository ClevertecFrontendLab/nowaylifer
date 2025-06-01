import { z } from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const imageFileSchema = z
    .instanceof(File)
    .refine((file) => !file || file.type.startsWith('image/'), 'Неподдерживаемое расширение файла')
    .refine((file) => file.size <= MAX_IMAGE_SIZE, 'Размер файла не должен превышать 5MB');

const ingredientSchema = z.object({
    title: z.string().min(1).max(50),
    count: z.coerce.number().positive() as z.ZodNumber | z.ZodString,
    measureUnit: z.string().min(1),
});
export type IngredientSchema = z.infer<typeof ingredientSchema>;

const stepSchema = z.object({
    stepNumber: z.number(),
    description: z.string().min(1).max(300),
    image: z.string().min(1).nullable().optional(),
});
export type StepSchema = z.infer<typeof stepSchema>;

export const recipeDraftSchema = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(500),
    portions: z.number().positive(),
    image: z.string().min(1),
    categoriesIds: z.string().array().min(3),
    time: z.number().positive().max(10000),
    ingredients: ingredientSchema.array().min(1),
    steps: stepSchema.array().min(1),
});
export type RecipeDraftSchema = z.infer<typeof recipeDraftSchema>;
