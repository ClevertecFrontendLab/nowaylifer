import { Badge, BadgeProps } from '@chakra-ui/react';

import { useRecipeCardStyles } from '../context';

export const RecipeCardBadge = ({ children, ...rest }: BadgeProps) => {
    const styles = useRecipeCardStyles();
    return (
        <Badge {...styles.badge} {...rest}>
            {children}
        </Badge>
    );
};
