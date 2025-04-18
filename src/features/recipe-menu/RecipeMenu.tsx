import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    Box,
    BoxProps,
    UnorderedList,
    useCallbackRef,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';

import { recipeCategoryMap, RecipeSubcategory } from '~/entities/recipe';

import { CategoryItem } from './CategoryItem';
import { SubcategoryItem } from './SubcategoryItem';

export interface RecipeMenuProps extends BoxProps {
    ref?: React.Ref<HTMLDivElement>;
}

export const RecipeMenu = (props: RecipeMenuProps) => {
    const params = useParams<'category' | 'subcategory'>();
    const navigate = useNavigate();

    const handleSubcategoryClick = useCallbackRef((subcategory: RecipeSubcategory) => {
        navigate(`/${params.category}/${subcategory.slug}`);
    });

    return (
        <Box pr={1} overflow='hidden' {...props}>
            <Box
                sx={{ '&::-webkit-scrollbar-track': { marginBottom: 2 } }}
                className='custom-scrollbar'
                overflowX='hidden'
                overflowY='auto'
                maxH='full'
                pl={2.5}
                pr={1}
            >
                <Accordion
                    allowToggle
                    defaultIndex={
                        params.category ? recipeCategoryMap[params.category].index : undefined
                    }
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
                                <CategoryItem active={isCategoryActive} category={category} />
                                <AccordionPanel py={0}>
                                    <UnorderedList styleType='none'>
                                        {Object.values(category.subcategories).map(
                                            (subcategory) => {
                                                const isSubcategoryActive =
                                                    isCategoryActive &&
                                                    subcategory.slug === params.subcategory;
                                                return (
                                                    <SubcategoryItem
                                                        onClick={handleSubcategoryClick}
                                                        key={subcategory.slug}
                                                        subcategory={subcategory}
                                                        active={isSubcategoryActive}
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
