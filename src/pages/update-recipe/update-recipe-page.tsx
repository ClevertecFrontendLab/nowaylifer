import { useLoaderData, useNavigate } from 'react-router';

import { selectCategoriesInvariant } from '~/entities/category';
import { buildRecipePath, RecipeWithAuthor } from '~/entities/recipe';
import { editRecipeApi, EditRecipeForm, EditRecipeHistoryState } from '~/features/edit-recipe';
import { RecipeDraft } from '~/features/edit-recipe/types';
import { useAppLoader } from '~/shared/infra/app-loader';
import { useAppSelector } from '~/shared/store';
import { Main } from '~/shared/ui/main';

export const UpdateRecipePage = () => {
    const recipe = useLoaderData<RecipeWithAuthor>();
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    const [updateRecipe, { isLoading }] = editRecipeApi.useUpdateRecipeMutation();
    const navigate = useNavigate();

    useAppLoader(isLoading);

    const handleSubmit = async (updates: Partial<RecipeDraft>) => {
        const res = await updateRecipe({ recipeId: recipe._id, updates });

        if (res.error) return;

        const updatedRecipe = res.data;

        navigate(buildRecipePath(updatedRecipe, categoryById), {
            state: { editRecipe: { event: 'published' } } satisfies EditRecipeHistoryState,
        });
    };

    return (
        <Main>
            <EditRecipeForm defaultValues={recipe} onSubmit={handleSubmit} />
        </Main>
    );
};
