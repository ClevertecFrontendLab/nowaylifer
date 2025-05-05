import { Box, Flex, FormLabel, HStack, Spacer } from '@chakra-ui/react';
import { useState } from 'react';

import { useAppSelector, useAppStore } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Button } from '~/shared/ui/button';

import { selectHasAnyFilter, selectHasFilter, selectIsFiltersDirty } from '../slice';
import { FilterCheckboxList } from './filter-checkbox-list';
import { FilterSelect } from './filter-select';
import { FilterSwitch } from './filter-switch';
import { SelectedFiltersTagList } from './selected-filters-tag-list';

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
                placeholder='Категория'
                containerProps={{ mb: { base: 4, lg: 6 } }}
                testId={{
                    field: TestId.CATEGORY_SELECT,
                    option: (option) =>
                        option.label === 'Веганская кухня'
                            ? TestId.VEGAN_CATEGORY_SELECT_OPTION
                            : undefined,
                }}
            />
            <FilterSelect
                filterType='authors'
                placeholder='Поик по автору'
                containerProps={{ mb: { base: 4, lg: 6 } }}
            />
            <FilterCheckboxList filterType='meat' title='Тип мяса:' />
            <FilterCheckboxList filterType='garnish' title='Тип гарнира:' />
            <Box>
                <FormLabel mb={4} display='flex' gap={3} alignItems='center'>
                    Исключить аллергены
                    <FilterSwitch
                        filterType='allergens'
                        onChange={setAllergenEnabled}
                        data-test-id={TestId.ALLERGEN_SWITCH_DRAWER}
                    />
                </FormLabel>
                <FilterSelect
                    filterType='allergens'
                    withFooter
                    disabled={!allergenEnabled}
                    footerInputPlaceholder='Другой аллерген'
                    placeholder='Выберите из списка аллергенов...'
                    testId={{
                        field: TestId.ALLERGEN_SELECT_DRAWER,
                        footerInput: TestId.ALLERGEN_ADD_OTHER_INPUT,
                        footerButton: TestId.ALLERGEN_ADD_OTHER_BUTTON,
                        option: (_, idx) => TestId.allergenSelectOption(idx),
                    }}
                />
            </Box>
            <Spacer minH={8} />
            <SelectedFiltersTagList mb={8} />
            <HStack gap={2} justifyContent='end'>
                <Button
                    onClick={onClear}
                    size={{ base: 'sm', lg: 'lg' }}
                    variant='outline'
                    data-test-id={TestId.CLEAR_FILTERS_BUTTON}
                >
                    Очистить фильтр
                </Button>
                <Button
                    variant='inverted'
                    disabled={hasAnyFilter ? false : !isFiltersDirty}
                    size={{ base: 'sm', lg: 'lg' }}
                    onClick={onFind}
                    data-test-id={TestId.FIND_RECIPE_BUTTON}
                >
                    Найти рецепт
                </Button>
            </HStack>
        </Flex>
    );
};
