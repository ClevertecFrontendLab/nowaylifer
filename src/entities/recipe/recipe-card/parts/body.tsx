import { CardBody, CardBodyProps } from '@chakra-ui/react';

import { useRecipeCardStyles } from '../context';

export const RecipeCardBody = (props: CardBodyProps) => {
    const styles = useRecipeCardStyles();
    return <CardBody {...styles.body} {...props} />;
};
