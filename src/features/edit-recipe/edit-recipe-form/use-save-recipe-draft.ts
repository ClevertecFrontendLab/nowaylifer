import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useAppLoader } from '~/shared/infra/app-loader';
import { RoutePath } from '~/shared/router';

import { editRecipeApi } from '../api/query';
import { EditRecipeHistoryState, RecipeDraft } from '../types';

export const useSaveRecipeDraft = (form: UseFormReturn<RecipeDraft>) => {
    const [saveDraft, { isLoading }] = editRecipeApi.useSaveDraftMutation();
    const navigate = useNavigate();

    useAppLoader(isLoading);

    return useCallback(async () => {
        const isTitleValid = await form.trigger('title', { shouldFocus: true });
        if (!isTitleValid) return { error: 'formInvalid' } as const;

        const res = await saveDraft(form.getValues());
        if (res.error) return { error: 'requestFailed' } as const;

        navigate(RoutePath.Main, {
            state: { editRecipe: { event: 'draftSaved' } } satisfies EditRecipeHistoryState,
        });

        return { success: true };
    }, [navigate, saveDraft, form]);
};
