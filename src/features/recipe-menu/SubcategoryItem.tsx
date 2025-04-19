import { Box, BoxProps, ListItem } from '@chakra-ui/react';
import { memo } from 'react';

import { RecipeCategory, RecipeSubcategory } from '~/entities/recipe/interface';
import { Button } from '~/shared/ui/Button';

export interface SubcategoryItemProps {
    active?: boolean;
    onClick?: (category: RecipeCategory, subcategory: RecipeSubcategory) => void;
    subcategory: RecipeSubcategory;
    category: RecipeCategory;
}

export const SubcategoryItem = memo(
    ({ active, category, subcategory, onClick }: SubcategoryItemProps) => (
        <ListItem>
            <Button
                onClick={() => onClick?.(category, subcategory)}
                _hover={{ ...(active ? undefined : { bg: 'lime.50' }) }}
                _focusVisible={{
                    boxShadow: 'none',
                    bg: active ? undefined : 'lime.50',
                }}
                variant='unstyled'
                textAlign='left'
                display='block'
                pos='relative'
                role='group'
                w='full'
                py={1.5}
                px={3}
            >
                <ListIcon
                    active={active}
                    _groupFocus={active ? undefined : { visibility: 'hidden' }}
                    _groupHover={active ? undefined : { visibility: 'hidden' }}
                />
                <Box fontWeight={active ? 'bold' : 'medium'}>{subcategory.label}</Box>
            </Button>
        </ListItem>
    ),
);

const ListIcon = ({ active, ...rest }: { active?: boolean } & BoxProps) => (
    <Box
        pos='absolute'
        bg='lime.300'
        w={active ? 2 : 'px'}
        h={active ? 7 : 6}
        transform='translateY(-50%)'
        left={active ? '-7px' : 0}
        top='50%'
        {...rest}
    />
);
