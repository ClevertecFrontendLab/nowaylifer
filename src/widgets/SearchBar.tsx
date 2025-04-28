import { Box, FormControl, FormLabel, HStack } from '@chakra-ui/react';
import { useState } from 'react';

import {
    FilterDrawer,
    FilterDrawerTrigger,
    FilterSelect,
    FilterSwitch,
    selectHasAppliedFilter,
} from '~/features/filter-recipe';
import { SearchRecipeInput } from '~/features/search-recipe';
import { useAppStore } from '~/shared/store';

export const SearchBar = () => {
    const store = useAppStore();
    const [allergenEnabled, setAllergenEnabled] = useState(() =>
        selectHasAppliedFilter(store.getState(), 'allergens'),
    );

    return (
        <Box>
            <HStack mb={4} gap={3}>
                <FilterDrawer>
                    <FilterDrawerTrigger />
                </FilterDrawer>
                <SearchRecipeInput />
            </HStack>
            <HStack justify='space-between' gap={3} pl={2} hideBelow='lg'>
                <FormControl w='auto' display='flex' alignItems='center' alignSelf='start' h={10}>
                    <FormLabel w='max-content' htmlFor='exclude-allergens' mb={0}>
                        Исключить мои аллергены
                    </FormLabel>
                    <FilterSwitch
                        data-test-id='allergens-switcher'
                        appliedFilter
                        applyOnChange
                        filterType='allergens'
                        id='exclude-allergens'
                        onChange={setAllergenEnabled}
                    />
                </FormControl>
                <FilterSelect
                    filterType='allergens'
                    appliedFilter
                    footerInputPlaceholder='Другой аллерген'
                    placeholder='Выберите из списка аллергенов...'
                    applyOnChange
                    withFooter
                    withinPortal
                    disabled={!allergenEnabled}
                    testId={{
                        field: 'allergens-menu-button',
                        menu: 'allergens-menu',
                        footerInput: 'add-other-allergen',
                        footerButton: 'add-allergen-button',
                    }}
                />
            </HStack>
        </Box>
    );
};
