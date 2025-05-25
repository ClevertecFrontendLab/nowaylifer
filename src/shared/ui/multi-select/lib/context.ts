import { createDescendantContext, createStylesContext, UsePopperReturn } from '@chakra-ui/react';
import { Context, createContext, useContextSelector } from 'use-context-selector';

import { MultiSelectStyles } from './anatomy';
import { UseMultiSelectReturn } from './use-multi-select';

export interface MultiSelectContext<Item> extends UseMultiSelectReturn<Item> {
    popper: UsePopperReturn;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MultiSelectContext = createContext<MultiSelectContext<any> | null>(null);

export function useMultiSelectContext<Item>(): MultiSelectContext<Item>;
export function useMultiSelectContext<Item, T>(selector: (ctx: MultiSelectContext<Item>) => T): T;
export function useMultiSelectContext<Item, T>(
    selector?: (ctx: MultiSelectContext<Item>) => T,
): MultiSelectContext<Item> | T {
    const safeSelector = (ctx: MultiSelectContext<Item>) => {
        if (!ctx) {
            throw new Error('useMultiSelectContext must be used within a MultiSelectProvider');
        }
        return selector?.(ctx) ?? ctx;
    };
    return useContextSelector(
        MultiSelectContext as Context<MultiSelectContext<Item>>,
        safeSelector,
    );
}

const [StylesProvider, useStyles] = createStylesContext('MultiSelect');
const useMultiSelectStyles = useStyles as () => MultiSelectStyles;

export { StylesProvider as MultiSelectStylesProvider, useMultiSelectStyles };

export const [
    MultiSelectDescendantsProvider,
    useMultiSelectDescendantsContext,
    useMultiSelectDescendants,
    useMultiSelectDescendant,
] = createDescendantContext();
