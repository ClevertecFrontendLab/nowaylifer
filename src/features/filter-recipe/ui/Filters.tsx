import { Box, Flex, FormLabel, HStack, Spacer } from '@chakra-ui/react';
import { useState } from 'react';

import { useAppSelector, useAppStore } from '~/shared/store';
import { Button } from '~/shared/ui/Button';

import { selectHasAnyFilter, selectHasFilter, selectIsFiltersDirty } from '../slice';
import { FilterCheckboxList } from './FilterCheckboxList';
import { FilterSelect } from './FilterSelect';
import { FilterSwitch } from './FilterSwitch';
import { SelectedFiltersTagList } from './SelectedFiltersTagList';

export const Filters = ({ onClear, onFind }: { onClear: () => void; onFind: () => void }) => {
    const store = useAppStore();
    const hasAnyFilter = useAppSelector(selectHasAnyFilter);
    const isFiltersDirty = useAppSelector(selectIsFiltersDirty);
    const [allergenEnabled, setAllergenEnabled] = useState(() =>
        selectHasFilter(store.getState(), 'allergens'),
    );

    return (
        <Flex h='max' minH='full' direction='column'>
            <FilterSelect
                filterType='categories'
                maxMenuHeight={328}
                placeholder='Категория'
                mb={{ base: 4, lg: 6 }}
                testId={{ control: 'filter-menu-button-категория' }}
            />
            <FilterSelect
                filterType='authors'
                maxMenuHeight={360}
                placeholder='Поик по автору'
                mb={{ base: 4, lg: 6 }}
            />
            <FilterCheckboxList filterType='meat' title='Тип мяса:' />
            <FilterCheckboxList filterType='side' title='Тип гарнира:' />
            <Box>
                <FormLabel mb={4} display='flex' gap={3} alignItems='center'>
                    Исключить аллергены
                    <FilterSwitch
                        data-test-id='allergens-switcher-filter'
                        filterType='allergens'
                        onChange={setAllergenEnabled}
                    />
                </FormLabel>
                <FilterSelect
                    filterType='allergens'
                    withMenuInput={true}
                    menuPosition='fixed'
                    disabled={!allergenEnabled}
                    minMenuHeight={400}
                    menuInputProps={{ 'data-test-id': 'add-other-allergen' }}
                    menuButtonProps={{ 'data-test-id': 'add-allergen-button' }}
                    menuInputPlaceholder='Другой аллерген'
                    placeholder='Выберите из списка аллергенов...'
                    testId={{ control: 'allergens-menu-button-filter' }}
                />
            </Box>
            <Spacer minH={8} />
            <SelectedFiltersTagList mb={8} />
            <HStack gap={2} justifyContent='end'>
                <Button
                    onClick={onClear}
                    size={{ base: 'sm', lg: 'lg' }}
                    variant='outline'
                    data-test-id='clear-filter-button'
                >
                    Очистить фильтр
                </Button>
                <Button
                    variant='inverted'
                    disabled={hasAnyFilter ? false : !isFiltersDirty}
                    size={{ base: 'sm', lg: 'lg' }}
                    onClick={onFind}
                    data-test-id='find-recipe-button'
                >
                    Найти рецепт
                </Button>
            </HStack>
        </Flex>
    );
};
