import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    Box,
    BoxProps,
    UseAccordionProps,
} from '@chakra-ui/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import {
    RootCategory,
    selectCategoriesInvariant,
    SubCategory,
    useActiveCategories,
} from '~/entities/category';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';

import { buildCategoryPath } from '../lib/util';
import { RootCategoryItem } from './root-category';
import { SubCategoryList } from './sub-category';

export interface CategoryNavProps extends BoxProps {
    ref?: React.Ref<HTMLDivElement>;
}

export const CategoryNav = (props: CategoryNavProps) => {
    const { rootCategories } = useAppSelector(selectCategoriesInvariant);
    const [activeRoot, activeSub] = useActiveCategories();
    const navigate = useNavigate();

    const handleSubCategoryClick = useCallback(
        (root: RootCategory, sub: SubCategory) => navigate(buildCategoryPath(root, sub)),
        [navigate],
    );

    const activeRootIndex = useMemo(
        () => (activeRoot ? rootCategories.indexOf(activeRoot) : -1),
        [activeRoot, rootCategories],
    );

    const activeSubIndex = useMemo(
        () => (activeRoot && activeSub ? activeRoot.subCategories.indexOf(activeSub) : -1),
        [activeRoot, activeSub],
    );

    const [index, setIndex] = useState(activeRootIndex);
    const prevActiveRootIndexRef = useRef(activeRootIndex);

    if (prevActiveRootIndexRef.current !== activeRootIndex) {
        prevActiveRootIndexRef.current = activeRootIndex;
        setIndex(activeRootIndex);
        return null;
    }

    const handleChange: UseAccordionProps['onChange'] = (expanded) => {
        const index = Array.isArray(expanded) ? expanded[0] : expanded;
        if (index < 0) {
            return setIndex(index);
        }
        const root = rootCategories[index];
        if (root === activeRoot) {
            return setIndex(index);
        }
        const sub = root.subCategories[0];
        navigate(buildCategoryPath(root, sub));
    };

    return (
        <Box
            className='custom-scrollbar'
            overflow='hidden auto'
            maxH='full'
            pl={2.5}
            mr={1}
            {...props}
        >
            <Accordion allowToggle index={index} onChange={handleChange}>
                {rootCategories.map((root) => (
                    <AccordionItem key={root._id} border='none'>
                        <RootCategoryItem
                            isActive={root === activeRoot}
                            rootCategory={root}
                            data-test-id={
                                root.category === 'vegan' ? TestId.RECIPE_MENU_VEGAN : undefined
                            }
                        />
                        <AccordionPanel py={0}>
                            <SubCategoryList
                                rootCategory={root}
                                onItemClick={handleSubCategoryClick}
                                activeIndex={root === activeRoot ? activeSubIndex : -1}
                            />
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
};
