import { useNavigate } from 'react-router';

import { selectCategoriesInvariant } from '~/entities/category';
import { buildRecipePath, Recipe } from '~/entities/recipe';
import { EditRecipeForm, EditRecipeHistoryState } from '~/features/edit-recipe';
import { useAppSelector } from '~/shared/store';
import { Main } from '~/shared/ui/main';

export const CreateRecipePage = () => {
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    const navigate = useNavigate();

    const handleCreate = async (newRecipe: Recipe) => {
        navigate(buildRecipePath(newRecipe, categoryById), {
            state: { editRecipe: { event: 'published' } } satisfies EditRecipeHistoryState,
        });
    };

    return (
        <Main>
            <EditRecipeForm mode='create' onSuccess={handleCreate} />
        </Main>
    );
};
