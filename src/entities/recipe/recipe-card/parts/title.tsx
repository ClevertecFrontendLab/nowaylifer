import { Heading, HeadingProps, HTMLChakraProps, LinkOverlay } from '@chakra-ui/react';
import { MaybeRenderProp } from '@chakra-ui/utils';
import { isFunction } from 'lodash-es';
import { Link } from 'react-router';

import { useRecipeCardStyles, useRecipeContext } from '../context';

export interface RecipeCardTitleProps extends Omit<HeadingProps, 'children'> {
    children?: MaybeRenderProp<HTMLChakraProps<'div'>>;
    asLink?: boolean;
}

export const RecipeCardTitle = ({ children, asLink = true, ...rest }: RecipeCardTitleProps) => {
    const styles = useRecipeCardStyles();
    const { recipeLink } = useRecipeContext();
    const { recipe } = useRecipeContext();

    if (isFunction(children)) {
        return children(styles.title);
    }

    const title = (
        <Heading {...styles.title} {...rest}>
            {recipe.title}
        </Heading>
    );

    if (asLink) {
        return (
            <LinkOverlay as={Link} to={recipeLink} minW={0}>
                {title}
            </LinkOverlay>
        );
    }

    return title;
};
