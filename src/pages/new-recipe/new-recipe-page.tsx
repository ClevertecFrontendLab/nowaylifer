import { useNavigate } from 'react-router';

import { selectCategoriesInvariant } from '~/entities/category';
import { buildRecipePath } from '~/entities/recipe';
import { editRecipeApi, EditRecipeForm, EditRecipeHistoryState } from '~/features/edit-recipe';
import { RecipeDraft } from '~/features/edit-recipe/types';
import { useAppLoader } from '~/shared/infra/app-loader';
import { useAppSelector } from '~/shared/store';
import { Main } from '~/shared/ui/main';

export const NewRecipePage = () => {
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    const [createRecipe, { isLoading }] = editRecipeApi.useCreateRecipeMutation();
    const navigate = useNavigate();

    useAppLoader(isLoading);

    const handleSubmit = async (draft: RecipeDraft) => {
        const res = await createRecipe(draft);

        if (res.error) return;

        const recipe = res.data;

        navigate(buildRecipePath(recipe, categoryById), {
            state: {
                editRecipe: { event: 'created' },
            } satisfies EditRecipeHistoryState,
        });
    };

    return (
        <Main>
            <EditRecipeForm onSubmit={handleSubmit} />
        </Main>
    );
};
