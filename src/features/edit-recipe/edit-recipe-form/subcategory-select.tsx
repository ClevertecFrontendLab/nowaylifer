import { Portal, useSize } from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { selectCategoriesInvariant } from '~/entities/category';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
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
    const items = useMemo(
        () => rootCategories.flatMap((root) => root.subCategories.map((sub) => sub._id)),
        [rootCategories],
    );

    return (
        <MultiSelect items={items} containerProps={{ maxW: '350px' }} {...props}>
            {({ selectedItems }) => (
                <>
                    <MultiSelectField
                        data-test-id={TestId.RECIPE_CATEGORY_SELECT}
                        placeholder='Выберите из списка...'
                    />
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
                    <MultiSelectMenu isLazy lazyBehavior='keepMounted'>
                        <MultiSelectMenuList>
                            {items.map((item, index) => (
                                <MultiSelectItem key={item} item={item} index={index}>
                                    {categoryById[item].title}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectMenuList>
                    </MultiSelectMenu>
                </>
            )}
        </MultiSelect>
    );
};

interface FittingMultiSelectTagListProps<T> extends Partial<UseFittingTagItemsOptions> {
    items: T[];
    renderTag: (item: T, index: number) => React.ReactNode;
}

export function FittingMultiSelectTagList<T extends string | number>({
    items,
    renderTag,
    minVisible,
    maxVisible,
    gap = 8,
}: FittingMultiSelectTagListProps<T>) {
    const { visibleItems, overflowCount, containerRef, hiddenContainerRef } = useFittingTagItems(
        items,
        { minVisible, maxVisible, gap },
    );

    return (
        <>
            <MultiSelectTagList
                ref={containerRef}
                flexWrap='nowrap'
                overflow='hidden'
                gap={`${gap}px`}
            >
                {visibleItems.map(renderTag)}
                {overflowCount > 0 && (
                    <MultiSelectTag flexShrink={0} item={null}>
                        +{overflowCount}
                    </MultiSelectTag>
                )}
            </MultiSelectTagList>

            {/* Hidden measurement container */}
            <Portal>
                <MultiSelectTagList
                    gap={`${gap}px`}
                    ref={hiddenContainerRef}
                    position='fixed'
                    visibility='hidden'
                    flexWrap='nowrap'
                >
                    {items.map(renderTag)}
                </MultiSelectTagList>
            </Portal>
        </>
    );
}

interface UseFittingTagItemsOptions {
    minVisible: number;
    maxVisible: number;
    gap: number;
}

const useFittingTagItems = <T extends string | number>(
    items: T[],
    { minVisible = 1, maxVisible = Infinity, gap = 0 }: Partial<UseFittingTagItemsOptions>,
) => {
    const [visibleCount, setVisibleCount] = useState(minVisible);
    const hiddenContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const containerSize = useSize(containerRef);

    useEffect(() => {
        const updateVisibleCount = () => {
            const hiddenTags = hiddenContainerRef.current?.children;
            if (!hiddenTags || !containerSize?.width) return;

            let totalWidth = 0;
            let count = 0;

            for (let i = 0; i < items.length; i++) {
                if (count >= maxVisible) break;

                const el = hiddenTags[i] as HTMLElement;
                const elWidth = el?.offsetWidth ?? 0;
                const gapWidth = i < items.length - 1 ? gap : 0;

                totalWidth += elWidth + gapWidth;

                if (totalWidth > containerSize.width) break;

                count++;
            }

            setVisibleCount(Math.max(Math.min(count, maxVisible), minVisible));
        };

        const rafId = requestAnimationFrame(updateVisibleCount);

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [items, containerSize?.width, minVisible, maxVisible, gap]);

    return {
        visibleItems: items.slice(0, visibleCount),
        overflowCount: Math.max(0, items.length - visibleCount),
        containerRef,
        hiddenContainerRef,
    };
};
