import { Box, chakra, useSize } from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';

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
        <MultiSelect
            containerProps={{ maxW: '350px', overflow: 'hidden' }}
            items={items}
            {...props}
        >
            {({ selectedItems }) => {
                let itemIndex = 0;
                return (
                    <>
                        <MultiSelectField placeholder='Выберите из списка...' />
                        <FittingMultiSelectTagList
                            items={selectedItems}
                            renderTag={(id, index) => (
                                <MultiSelectTag key={id} item={id} index={index}>
                                    {categoryById[id].title}
                                </MultiSelectTag>
                            )}
                        />
                        <MultiSelectClearButton />
                        <MultiSelectIcon />
                        <MultiSelectMenu lazyBehavior='keepMounted' withinPortal>
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

interface FittingMultiSelectTagListProps<T> {
    items: T[];
    renderTag: (item: T, index: number) => React.ReactNode;
    minVisible?: number;
}

export function FittingMultiSelectTagList<T extends string | number>({
    items,
    renderTag,
    minVisible = 1,
}: FittingMultiSelectTagListProps<T>) {
    const { visibleItems, overflowCount, containerRef, hiddenContainerRef } = useFittingTagItems(
        items,
        minVisible,
    );

    return (
        <>
            <MultiSelectTagList ref={containerRef} flexWrap='nowrap' overflow='hidden'>
                {visibleItems.map(renderTag)}
                {overflowCount > 0 && (
                    <MultiSelectTag flexShrink={0} item={null}>
                        +{overflowCount}
                    </MultiSelectTag>
                )}
            </MultiSelectTagList>

            {/* Hidden measurement container */}
            <MultiSelectTagList
                ref={hiddenContainerRef}
                position='absolute'
                visibility='hidden'
                flexWrap='nowrap'
                height={0}
            >
                {items.map(renderTag)}
            </MultiSelectTagList>
        </>
    );
}

const useFittingTagItems = <T extends string | number>(items: T[], minVisible = 1) => {
    const [visibleCount, setVisibleCount] = useState(minVisible);
    const hiddenContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const containerSize = useSize(containerRef);

    useEffect(() => {
        const hiddenTags = hiddenContainerRef.current?.children;
        if (!hiddenTags || !containerSize?.width) return;

        let totalWidth = 0;
        let count = 0;

        for (let i = 0; i < items.length; i++) {
            const el = hiddenTags[i] as HTMLElement;
            const width = el?.offsetWidth ?? 0;
            if (totalWidth + width > containerSize.width) break;
            totalWidth += width;
            count++;
        }

        setVisibleCount(Math.max(count, minVisible));
    }, [items, containerSize?.width, minVisible]);

    return {
        visibleItems: items.slice(0, visibleCount),
        overflowCount: Math.max(0, items.length - visibleCount),
        containerRef,
        hiddenContainerRef,
    };
};
