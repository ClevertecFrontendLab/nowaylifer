import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    Box,
    BoxProps,
    UnorderedList,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

import { RecipeCategory, recipeCategoryMap, RecipeSubcategory } from '~/entities/recipe';

import { CategoryItem } from './CategoryItem';
import { SubcategoryItem } from './SubcategoryItem';

export interface RecipeMenuProps extends BoxProps {
    ref?: React.Ref<HTMLDivElement>;
}

export const RecipeMenu = (props: RecipeMenuProps) => {
    const params = useParams<'category' | 'subcategory'>();
    const navigate = useNavigate();

    const handleSubcategoryClick = useCallback(
        (category: RecipeCategory, subcategory: RecipeSubcategory) =>
            navigate(`/${category.slug}/${subcategory.slug}`),
        [navigate],
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
                    defaultIndex={params.category ? recipeCategoryMap[params.category].index : -1}
                    onChange={(expanded) => {
                        const index = Array.isArray(expanded) ? expanded[0] : expanded;
                        if (index >= 0) {
                            const category = Object.values(recipeCategoryMap)[index];
                            const subcategory = Object.values(category.subcategories)[0];
                            navigate(`/${category.slug}/${subcategory.slug}`);
                        }
                    }}
                >
                    {Object.values(recipeCategoryMap).map((category) => {
                        const isCategoryActive = category.slug === params?.category;
                        return (
                            <AccordionItem key={category.slug} border='none'>
                                <CategoryItem
                                    active={isCategoryActive}
                                    category={category}
                                    data-test-id={
                                        category.slug === 'vegan' ? 'vegan-cuisine' : category.slug
                                    }
                                />
                                <AccordionPanel py={0}>
                                    <UnorderedList styleType='none'>
                                        {Object.values(category.subcategories).map(
                                            (subcategory) => {
                                                const isSubcategoryActive =
                                                    isCategoryActive &&
                                                    subcategory.slug === params.subcategory;
                                                return (
                                                    <SubcategoryItem
                                                        key={subcategory.slug}
                                                        category={category}
                                                        subcategory={subcategory}
                                                        active={isSubcategoryActive}
                                                        onClick={handleSubcategoryClick}
                                                        data-test-id={
                                                            isSubcategoryActive
                                                                ? `${subcategory.slug}-active`
                                                                : undefined
                                                        }
                                                    />
                                                );
                                            },
                                        )}
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
