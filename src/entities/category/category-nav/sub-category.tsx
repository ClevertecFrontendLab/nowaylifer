import { Box, BoxProps, ListItem, ListItemProps, ListProps, UnorderedList } from '@chakra-ui/react';
import { memo } from 'react';

import { RootCategory, SubCategory } from '~/entities/category';
import { TestId } from '~/shared/test-ids';
import { Button } from '~/shared/ui/button';

export interface SubCategoryListProps extends ListProps {
    rootCategory: RootCategory;
    activeIndex: number;
    onItemClick?: SubCategoryItemProps['onClick'];
}

export const SubCategoryList = memo(
    ({ rootCategory, activeIndex, onItemClick, ...props }: SubCategoryListProps) => (
        <UnorderedList styleType='none' {...props}>
            {rootCategory.subCategories.map((sub, idx) => (
                <SubCategoryItem
                    key={sub._id}
                    rootCategory={rootCategory}
                    subCategory={sub}
                    isActive={idx === activeIndex}
                    onClick={onItemClick}
                />
            ))}
        </UnorderedList>
    ),
);

export interface SubCategoryItemProps extends Omit<ListItemProps, 'onClick'> {
    subCategory: SubCategory;
    rootCategory: RootCategory;
    isActive: boolean;
    onClick?: (root: RootCategory, sub: SubCategory) => void;
}

export const SubCategoryItem = memo(
    ({
        isActive,
        rootCategory: root,
        subCategory: sub,
        onClick,
        ...props
    }: SubCategoryItemProps) => (
        <ListItem
            data-test-id={isActive ? TestId.activeSubCategory(sub.category) : undefined}
            {...props}
        >
            <Button
                onClick={() => onClick?.(root, sub)}
                _hover={{ ...(isActive ? undefined : { bg: 'lime.50' }) }}
                _focusVisible={{
                    boxShadow: 'none',
                    bg: isActive ? undefined : 'lime.50',
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
                    isActive={isActive}
                    _groupFocus={isActive ? undefined : { visibility: 'hidden' }}
                    _groupHover={isActive ? undefined : { visibility: 'hidden' }}
                />
                <Box fontWeight={isActive ? 'bold' : 'medium'}>{sub.title}</Box>
            </Button>
        </ListItem>
    ),
);

const ListIcon = ({ isActive, ...rest }: { isActive: boolean } & BoxProps) => (
    <Box
        pos='absolute'
        bg='lime.300'
        w={isActive ? 2 : 'px'}
        h={isActive ? 7 : 6}
        transform='translateY(-50%)'
        left={isActive ? '-7px' : 0}
        top='50%'
        {...rest}
    />
);
