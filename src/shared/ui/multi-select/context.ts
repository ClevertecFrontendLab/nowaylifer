import { createStylesContext, UsePopperReturn } from '@chakra-ui/react';
import { createContext } from '@chakra-ui/utils';

import { MultiSelectStyles } from './anatomy';
import { UseMultiSelectReturn } from './use-multi-select';

export interface MultiSelectContext<Item> extends UseMultiSelectReturn<Item> {
    popper: UsePopperReturn;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const [Provider, useContext] = createContext<MultiSelectContext<any>>({
    hookName: 'useMultiSelectContext',
    providerName: 'MultiSelectProvider',
});

const useMultiSelectContext: <Item = unknown>() => MultiSelectContext<Item> = useContext;
export { Provider as MultiSelectProvider, useMultiSelectContext };

const [StylesProvider, useStyles] = createStylesContext('MultiSelect');
const useMultiSelectStyles = useStyles as () => MultiSelectStyles;

export { StylesProvider as MultiSelectStylesProvider, useMultiSelectStyles };
