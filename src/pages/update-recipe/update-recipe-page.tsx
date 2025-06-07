import { useLoaderData, useNavigate } from 'react-router';

import { selectCategoriesInvariant } from '~/entities/category';
import { buildRecipePath, Recipe } from '~/entities/recipe';
import { EditRecipeForm, EditRecipeHistoryState } from '~/features/edit-recipe';
import { useAppSelector } from '~/shared/store';
import { Main } from '~/shared/ui/main';

export const UpdateRecipePage = () => {
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    const recipe = useLoaderData<Recipe>();
    const navigate = useNavigate();

    const handleUpdated = async (updatedRecipe: Recipe) => {
        navigate(buildRecipePath(updatedRecipe, categoryById), {
            state: { editRecipe: { event: 'published' } } satisfies EditRecipeHistoryState,
        });
    };

    return (
        <Main>
            <EditRecipeForm
                mode='update'
                recipeId={recipe._id}
                defaultValues={recipe}
                onSuccess={handleUpdated}
            />
        </Main>
    );
};
