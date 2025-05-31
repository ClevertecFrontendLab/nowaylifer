import { useCallback } from 'react';

import { useAppLoader } from '~/shared/infra/app-loader';

import { editRecipeApi } from '../api/query';
import { RecipeDraft } from '../types';

export function useRecipeMutation(mode: 'create' | 'update') {
    const [createRecipe, { isLoading: creating }] = editRecipeApi.useCreateRecipeMutation();
    const [updateRecipe, { isLoading: updating }] = editRecipeApi.useUpdateRecipeMutation();

    useAppLoader(creating || updating);

    const mutationFn = useCallback(
        (draft: RecipeDraft, recipeId?: string) => {
            if (mode === 'create') {
                return createRecipe(draft);
            }
            if (!recipeId) {
                throw new Error('recipeId is required in update mode');
            }
            return updateRecipe({ recipeId, updates: draft });
        },

        [mode, createRecipe, updateRecipe],
    );

    return mutationFn;
}
