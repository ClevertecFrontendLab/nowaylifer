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
                borderColor='blackAlpha.600'
                borderRadius={{ base: 'base', lg: 'md' }}
                _placeholder={{ color: 'lime.800' }}
                _hover={{ borderColor: 'blackAlpha.600' }}
                _focus={{ boxShadow: 'none', borderColor: 'blackAlpha.600' }}
                placeholder='Название или ингридиент...'
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
                />
            </InputRightElement>
        </InputGroup>
    );
};
