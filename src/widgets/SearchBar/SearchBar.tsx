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
                        Исключить аллергены
                    </FormLabel>
                    <FilterSwitch
                        appliedFilter
                        applyOnChange
                        filterType='allergens'
                        id='exclude-allergens'
                        onChange={setAllergenEnabled}
                    />
                </FormControl>
                <FilterSelect
                    applyOnChange
                    appliedFilter
                    withMenuInput
                    filterType='allergens'
                    placeholder='Выберите из списка...'
                    menuInputPlaceholder='Другой аллерген'
                    disabled={!allergenEnabled}
                    menuPortalTarget={document.body}
                />
            </HStack>
        </Box>
    );
};
