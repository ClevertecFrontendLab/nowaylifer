import { Card, CardProps, LinkBox, useMultiStyleConfig } from '@chakra-ui/react';

import { RecipeCardStyles } from '../anatomy';
import { RecipeCardStylesProvider, RecipeContext, RecipeProvider } from '../context';
import { RecipeCardVariant } from '../theme';

export interface RecipeCardRootProps extends CardProps, RecipeContext {
    variant?: RecipeCardVariant;
    asLinkBox?: boolean;
}

export const RecipeCardRoot = (props: RecipeCardRootProps) => {
    const { children, recipe, recipeLink, categories, asLinkBox, testId, ...cardProps } = props;
    const styles = useMultiStyleConfig('RecipeCard', props) as RecipeCardStyles;
    const ctx = { recipe, recipeLink: recipeLink || '', categories, testId };
    return (
        <RecipeProvider value={ctx}>
            <RecipeCardStylesProvider value={styles}>
                <Card
                    as={asLinkBox ? LinkBox : undefined}
                    sx={asLinkBox ? undefined : { '& a::before': { display: 'none' } }}
                    data-test-id={testId?.root}
                    {...styles.root}
                    {...cardProps}
                >
                    {children}
                </Card>
            </RecipeCardStylesProvider>
        </RecipeProvider>
    );
};
