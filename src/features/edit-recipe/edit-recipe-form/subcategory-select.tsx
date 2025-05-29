import { Box, chakra } from '@chakra-ui/react';
import { useMemo } from 'react';

import { selectCategoriesInvariant } from '~/entities/category';
import { useAppSelector } from '~/shared/store';
import {
    MultiSelect,
    MultiSelectClearButton,
    MultiSelectField,
    MultiSelectIcon,
    MultiSelectItem,
    MultiSelectMenu,
    MultiSelectMenuList,
    MultiSelectProps,
    MultiSelectTag,
    MultiSelectTagList,
} from '~/shared/ui/multi-select';

export interface SubCategorySelectProps
    extends Omit<MultiSelectProps<string>, 'items' | 'itemToString'> {}

export const SubCategorySelect = (props: SubCategorySelectProps) => {
    const { rootCategories, categoryById } = useAppSelector(selectCategoriesInvariant);
    const { groups, items } = useMemo(() => {
        const groups = rootCategories.map((root) => ({
            key: root._id,
            groupLabel: root.title,
            options: root.subCategories.map((sub) => sub._id),
        }));
        return { groups, items: groups.flatMap((group) => group.options) };
    }, [rootCategories]);

    return (
        <MultiSelect containerProps={{ maxW: '350px' }} items={items} {...props}>
            {({ selectedItems }) => {
                const itemsToShow = selectedItems.slice(0, 2);
                const diff = selectedItems.length - itemsToShow.length;
                let itemIndex = 0;
                return (
                    <>
                        <MultiSelectField placeholder='Выберите из списка...' />
                        <MultiSelectTagList flexWrap='nowrap'>
                            <>
                                {itemsToShow.map((selectedItem, index) => (
                                    <MultiSelectTag
                                        key={selectedItem}
                                        item={selectedItem}
                                        index={index}
                                    >
                                        {categoryById[selectedItem].title}
                                    </MultiSelectTag>
                                ))}
                                {diff > 0 && (
                                    <MultiSelectTag flexShrink={0} item={null}>
                                        +{diff}
                                    </MultiSelectTag>
                                )}
                            </>
                        </MultiSelectTagList>
                        <MultiSelectClearButton />
                        <MultiSelectIcon />
                        <MultiSelectMenu lazyBehavior='keepMounted'>
                            <MultiSelectMenuList>
                                {groups.map(({ groupLabel, options, key }) => (
                                    <chakra.li key={key}>
                                        <Box>{groupLabel}</Box>
                                        <chakra.ul>
                                            {options.map((item) => (
                                                <MultiSelectItem
                                                    key={item}
                                                    item={item}
                                                    index={itemIndex++}
                                                >
                                                    {categoryById[item].title}
                                                </MultiSelectItem>
                                            ))}
                                        </chakra.ul>
                                    </chakra.li>
                                ))}
                            </MultiSelectMenuList>
                        </MultiSelectMenu>
                    </>
                );
            }}
        </MultiSelect>
    );
};
