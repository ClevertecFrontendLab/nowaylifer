import { useEffect } from 'react';

import { useToast } from '~/shared/infra/toast';
import { createHistoryStore } from '~/shared/router';

import { EditRecipeHistoryState } from './types';

export const useEditRecipeResultEffect = () => {
    const { toast } = useToast();

    useEffect(() => {
        const historyStore = createHistoryStore<EditRecipeHistoryState>();
        const { event } = historyStore.get().editRecipe ?? {};

        switch (event) {
            case 'created':
                toast({ title: 'Рецепт успешно опубликован', status: 'success' });
        }

        historyStore.delete('editRecipe');
    }, [toast]);
};
