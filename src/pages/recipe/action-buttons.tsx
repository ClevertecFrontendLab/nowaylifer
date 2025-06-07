import { selectCategoriesInvariant } from '~/entities/category';
import { Recipe } from '~/entities/recipe';
import { DeleteRecipeButton, UpdateRecipeButton } from '~/features/edit-recipe';
import { BookmarkRecipeButton, LikeRecipeButton } from '~/features/react-to-recipe';
import { useAppSelector } from '~/shared/store';

export const OwnRecipeActionButtons = ({ recipe }: { recipe: Recipe }) => {
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    return (
        <>
            <DeleteRecipeButton recipe={recipe} />
            <UpdateRecipeButton recipe={recipe} categoryById={categoryById} />
        </>
    );
};

export const RecipeActionButtons = ({ recipe }: { recipe: Recipe }) => (
    <>
        <LikeRecipeButton recipe={recipe} />
        <BookmarkRecipeButton recipe={recipe} />
    </>
);
