import { Heading, HeadingProps, HTMLChakraProps, LinkOverlay } from '@chakra-ui/react';
import { MaybeRenderProp } from '@chakra-ui/utils';
import { Link } from 'react-router';

import { useRecipeCardStyles, useRecipeContext } from '../context';

export interface RecipeCardTitleProps extends Omit<HeadingProps, 'children'> {
    children?: MaybeRenderProp<HTMLChakraProps<'div'>>;
}

export const RecipeCardTitle = ({ children, ...rest }: RecipeCardTitleProps) => {
    const styles = useRecipeCardStyles();
    const { recipeLink } = useRecipeContext();
    const { recipe } = useRecipeContext();

    return typeof children === 'function' ? (
        children(styles.title)
    ) : (
        <LinkOverlay as={Link} to={recipeLink} minW={0}>
            <Heading {...styles.title} {...rest}>
                {recipe.title}
            </Heading>
        </LinkOverlay>
    );
};
