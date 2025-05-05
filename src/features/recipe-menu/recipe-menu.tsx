import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    Box,
    BoxProps,
    UnorderedList,
} from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { Category, SubCategory, useActiveCategories } from '~/entities/category';
import { selectCategoriesInvariant } from '~/entities/category/selectors';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';

import { CategoryItem } from './category-item';
import { SubcategoryItem } from './subcategory-item';

export interface RecipeMenuProps extends BoxProps {
    ref?: React.Ref<HTMLDivElement>;
}

export const RecipeMenu = (props: RecipeMenuProps) => {
    const [activeRootCategory, activeSubCategory] = useActiveCategories();
    const { rootCategories } = useAppSelector(selectCategoriesInvariant);
    const navigate = useNavigate();

    const handleSubcategoryClick = useCallback(
        (category: Category, subcategory: SubCategory) =>
            navigate(`/${category.category}/${subcategory.category}`),
        [navigate],
    );

    const expandedIndex = useMemo(
        () => (activeRootCategory ? rootCategories.indexOf(activeRootCategory) : -1),
        [activeRootCategory, rootCategories],
    );

    return (
        <Box pr={1} overflow='hidden' {...props}>
            <Box
                sx={{
                    '::-webkit-scrollbar-track': { mb: 2 },
                    scrollbarGutter: 'stable',
                }}
                className='custom-scrollbar'
                overflowX='hidden'
                overflowY='auto'
                maxH='full'
                pl={2.5}
                pr={1}
            >
                <Accordion
                    allowToggle
                    defaultIndex={expandedIndex}
                    onChange={(expanded) => {
                        const index = Array.isArray(expanded) ? expanded[0] : expanded;
                        if (index >= 0) {
                            const category = rootCategories[index];
                            const subcategory = category.subCategories[0];
                            navigate(`/${category.category}/${subcategory.category}`);
                        }
                    }}
                >
                    {rootCategories.map((category) => {
                        const isCategoryActive = category === activeRootCategory;
                        return (
                            <AccordionItem key={category._id} border='none'>
                                <CategoryItem
                                    active={isCategoryActive}
                                    category={category}
                                    data-test-id={
                                        category.category === 'vegan'
                                            ? TestId.RECIPE_MENU_VEGAN
                                            : undefined
                                    }
                                />
                                <AccordionPanel py={0}>
                                    <UnorderedList styleType='none'>
                                        {category.subCategories.map((subcategory) => {
                                            const isSubcategoryActive =
                                                isCategoryActive &&
                                                subcategory === activeSubCategory;
                                            return (
                                                <SubcategoryItem
                                                    key={subcategory._id}
                                                    category={category}
                                                    subcategory={subcategory}
                                                    active={isSubcategoryActive}
                                                    onClick={handleSubcategoryClick}
                                                    data-test-id={
                                                        isSubcategoryActive
                                                            ? `${subcategory.category}-active`
                                                            : undefined
                                                    }
                                                />
                                            );
                                        })}
                                    </UnorderedList>
                                </AccordionPanel>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Box>
        </Box>
    );
};
