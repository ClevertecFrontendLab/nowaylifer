import { Heading, SimpleGridProps } from '@chakra-ui/react';
import { isString } from 'lodash-es';

import { ActiveCategories, selectCategoriesInvariant } from '~/entities/category';
import {
    buildRecipePath,
    getRecipeRootCategories,
    Recipe,
    RecipeCard,
    RecipeCardsGrid,
} from '~/entities/recipe';
import { BookmarkRecipeButton } from '~/features/react-to-recipe';
import { HighlightSearchMatch } from '~/features/search-recipe';
import { selectSessionData } from '~/shared/session/slice';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';

export interface RecipeGridProps extends SimpleGridProps {
    recipes: Recipe[];
    searchString?: string;
    activeCategories?: ActiveCategories;
}

export const RecipeGrid = ({
    recipes,
    searchString,
    activeCategories,
    ...props
}: RecipeGridProps) => {
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    const session = useAppSelector(selectSessionData);

    return (
        <RecipeCardsGrid {...props}>
            {recipes.map((recipe, idx) => (
                <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    variant='horizontal'
                    recipeLink={buildRecipePath(recipe, categoryById, { activeCategories })}
                    categories={getRecipeRootCategories(recipe, categoryById)}
                    {...(session?.userId !== recipe.authorId && {
                        actionSlot: <BookmarkRecipeButton recipe={recipe} variant='short' />,
                    })}
                    {...(isString(searchString) && {
                        renderTitle: (styleProps) => (
                            <Heading {...styleProps}>
                                <HighlightSearchMatch query={searchString}>
                                    {recipe.title}
                                </HighlightSearchMatch>
                            </Heading>
                        ),
                    })}
                    data-test-id={TestId.recipeCard(idx)}
                />
            ))}
        </RecipeCardsGrid>
    );
};
