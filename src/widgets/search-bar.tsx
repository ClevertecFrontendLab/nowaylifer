import {
    Box,
    BoxProps,
    Center,
    FormControl,
    FormLabel,
    HStack,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';

import {
    applyFilter,
    FilterDrawer,
    FilterDrawerTrigger,
    FilterSelect,
    FilterSwitch,
    selectHasAppliedFilter,
} from '~/features/filter-recipe';
import { SearchRecipeInput, setIsSearchForceEnabled } from '~/features/search-recipe';
import { useAppDispatch, useAppStore } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Loader } from '~/shared/ui/loader';

export interface SearchBarProps extends BoxProps {
    isLoading?: boolean;
}

export const SearchBar = ({ isLoading, ...props }: SearchBarProps) => {
    const store = useAppStore();
    const dispatch = useAppDispatch();
    const [allergenEnabled, setAllergenEnabled] = useState(() =>
        selectHasAppliedFilter(store.getState(), 'allergens'),
    );
    const lg = useBreakpointValue({ base: false, lg: true });

    return (
        <>
            <Center display={isLoading ? undefined : 'none'}>
                <Loader data-test-id={TestId.SEARCH_BAR_LOADER} />
            </Center>
            <Box display={isLoading ? 'none' : undefined} w='full' maxW='518px' pt={7.5} {...props}>
                <HStack mb={{ base: 0, lg: 4 }} gap={3}>
                    <FilterDrawer>
                        <FilterDrawerTrigger />
                    </FilterDrawer>
                    <SearchRecipeInput onSearchStart={() => dispatch(applyFilter('allergens'))} />
                </HStack>
                {lg && (
                    <HStack justify='space-between' gap={3} pl={2}>
                        <FormControl
                            w='auto'
                            display='flex'
                            alignItems='center'
                            alignSelf='start'
                            h={10}
                        >
                            <FormLabel w='max-content' htmlFor='exclude-allergens' mb={0}>
                                Исключить мои аллергены
                            </FormLabel>
                            <FilterSwitch
                                data-test-id={TestId.ALLERGEN_SWITCH}
                                appliedFilter
                                applyOnChange
                                filterType='allergens'
                                id='exclude-allergens'
                                onChange={setAllergenEnabled}
                            />
                        </FormControl>
                        <FilterSelect
                            filterType='allergens'
                            onChange={(selectedItems) => {
                                dispatch(setIsSearchForceEnabled(selectedItems.length > 0));
                            }}
                            footerInputPlaceholder='Другой аллерген'
                            placeholder='Выберите из списка аллергенов...'
                            withFooter
                            withinPortal
                            disabled={!allergenEnabled}
                            testId={{
                                menu: TestId.ALLERGEN_SELECT_MENU,
                                field: TestId.ALLERGEN_SELECT,
                                footerInput: TestId.ALLERGEN_ADD_OTHER_INPUT,
                                footerButton: TestId.ALLERGEN_ADD_OTHER_BUTTON,
                                option: (_, idx) => TestId.allergenSelectOption(idx),
                            }}
                        />
                    </HStack>
                )}
            </Box>
        </>
    );
};
