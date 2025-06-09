import { Badge, BadgeProps } from '@chakra-ui/react';

import { PluralForms, pluralizeRu } from '~/shared/util';

export interface NewRecipesBadgeProps extends BadgeProps {
    count: number;
}

export const NewRecipesBadge = ({ count, ...props }: NewRecipesBadgeProps) => (
    <Badge
        px={2}
        size='xs'
        lineHeight={5}
        borderRadius='base'
        bg='blackAlpha.100'
        display='inline-block'
        {...props}
    >
        {formatNewRecipesCount(count)}
    </Badge>
);

const forms: PluralForms = {
    one: 'новый рецeпт',
    few: 'новых рецепта',
    many: 'новых рецептов',
    other: 'новых рецептов',
};

const formatNewRecipesCount = (count: number) => `${count} ${pluralizeRu(count, forms)}`;
