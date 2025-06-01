import { useEffect } from 'react';

import { useToast } from '~/shared/infra/toast';
import { createHistoryStore } from '~/shared/router';

import { EditRecipeEvent, EditRecipeHistoryState } from './types';

const messageByEvent: Record<EditRecipeEvent, string> = {
    published: 'Рецепт успешно опубликован',
    deleted: 'Рецепт успешно удален',
    draftSaved: 'Черновик успешно сохранен',
};

export const useEditRecipeEventEffect = () => {
    const { toast } = useToast();

    useEffect(() => {
        const historyStore = createHistoryStore<EditRecipeHistoryState>();
        const { event } = historyStore.get().editRecipe ?? {};

        if (event) {
            toast({ title: messageByEvent[event], status: 'success' });
            historyStore.delete('editRecipe');
        }
    }, [toast]);
};
