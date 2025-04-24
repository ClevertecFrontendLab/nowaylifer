import { BoxProps, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { useAppDispatch } from '~/shared/store';
import { SearchIcon } from '~/shared/ui/SearchIcon';

import { clearRecipeSearch, setRecipeSearch } from './slice';

const SEARCH_WORD_MIN_LENGTH = 3;

export const SearchRecipeInput = (props: BoxProps) => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchEnabled, setSearchEnabled] = useState(false);

    const search = () => {
        if (!inputRef.current) return;
        dispatch(setRecipeSearch(inputRef.current.value));
    };

    const clear = () => {
        dispatch(clearRecipeSearch());
    };

    return (
        <InputGroup size={{ base: 'sm', lg: 'lg' }} {...props}>
            <Input
                ref={inputRef}
                onChange={(e) => {
                    const value = e.target.value;
                    if (!value) clear();
                    setSearchEnabled(value.length >= SEARCH_WORD_MIN_LENGTH);
                }}
                onKeyDown={(e) => e.key === 'Enter' && searchEnabled && search()}
                borderRadius={{ base: 'base', lg: 'md' }}
                placeholder='Название или ингридиент...'
                data-test-id='search-input'
            />
            <InputRightElement>
                <IconButton
                    disabled={!searchEnabled}
                    icon={<SearchIcon />}
                    onClick={search}
                    variant='unstyled'
                    display='flex'
                    size={{ base: 'sm', lg: 'lg' }}
                    aria-label='Искать'
                    data-test-id='search-button'
                />
            </InputRightElement>
        </InputGroup>
    );
};
