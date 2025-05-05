import {
    BadgeProps,
    Image,
    ResponsiveValue,
    useTheme,
    Wrap,
    WrapItem,
    WrapProps,
} from '@chakra-ui/react';
import { isObject } from '@chakra-ui/utils';

import { buildImageSrc } from '~/shared/util';

import { useRecipeCardStyles, useRecipeContext } from '../context';
import { RecipeCardBadge } from './badge';

export interface RecipeCardCategoryListProps extends WrapProps {
    onlyFirst?: ResponsiveValue<boolean>;
}

const getDisplayValue = (bool: boolean) => (bool ? 'none' : null);

export const RecipeCardCategoryList = ({ onlyFirst }: RecipeCardCategoryListProps) => {
    const styles = useRecipeCardStyles();
    const theme = useTheme<ChakraTheme>();
    const { toArrayValue, isResponsive } = theme.__breakpoints!;
    const { categories } = useRecipeContext();
    const value =
        isObject(onlyFirst) && isResponsive(onlyFirst) ? toArrayValue(onlyFirst) : onlyFirst;

    let itemDisplay: WrapProps['display'];

    if (Array.isArray(value)) {
        itemDisplay = value.map(getDisplayValue);
    } else if (typeof value === 'boolean') {
        itemDisplay = getDisplayValue(value) ?? undefined;
    }

    return (
        <Wrap {...styles.categoryList}>
            {categories.map((c, i) => (
                <WrapItem key={c._id} display={i > 0 ? itemDisplay : undefined}>
                    <RecipeCardCategory iconSrc={buildImageSrc(c.icon!)} label={c.title} />
                </WrapItem>
            ))}
        </Wrap>
    );
};

const RecipeCardCategory = ({
    iconSrc,
    label,
    ...rest
}: { iconSrc: string; label: string } & BadgeProps) => {
    const styles = useRecipeCardStyles();
    return (
        <RecipeCardBadge {...styles.category} {...rest}>
            <Image src={iconSrc} boxSize={4} />
            {label}
        </RecipeCardBadge>
    );
};
