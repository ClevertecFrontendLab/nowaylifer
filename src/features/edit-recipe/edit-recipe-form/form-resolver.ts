import { zodResolver } from '@hookform/resolvers/zod';
import { Resolver } from 'react-hook-form';
import { z } from 'zod';

import { recipeDraftSchema } from '../schema';

// custom resolver to skip validation of the last ingredient if there is at least two of them
export const formResolver: Resolver<z.infer<typeof recipeDraftSchema>> = async (
    values,
    context,
    options,
) => {
    const ingredients = values.ingredients ?? [];
    const shouldSkipLast = ingredients.length >= 2;

    const valuesToValidate = {
        ...values,
        ingredients: shouldSkipLast ? ingredients.slice(0, -1) : ingredients,
    };

    const baseResolver = zodResolver(recipeDraftSchema);
    const result = await baseResolver(valuesToValidate, context, options);

    return {
        ...result,
        values: {
            ...result.values,
            ingredients: values.ingredients,
        },
    };
};
