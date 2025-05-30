import { selectCategoriesInvariant } from '~/entities/category';
import { RecipeWithAuthor } from '~/entities/recipe';
import { DeleteRecipeButton, UpdateRecipeButton } from '~/features/edit-recipe';
import { BookmarkRecipeButton, LikeRecipeButton } from '~/features/react-to-recipe';
import { useAppSelector } from '~/shared/store';

export const OwnRecipeActionButtons = ({ recipe }: { recipe: RecipeWithAuthor }) => {
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    return (
        <>
            <DeleteRecipeButton recipe={recipe} />
            <UpdateRecipeButton recipe={recipe} categoryById={categoryById} />
        </>
    );
};

export const RecipeActionButtons = ({ recipe }: { recipe: RecipeWithAuthor }) => (
    <>
        <LikeRecipeButton recipe={recipe} />
        <BookmarkRecipeButton recipe={recipe} />
    </>
);
