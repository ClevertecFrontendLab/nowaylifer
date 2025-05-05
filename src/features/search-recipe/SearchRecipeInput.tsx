import { BoxProps, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { SearchIcon } from '~/shared/ui/SearchIcon';

import {
    applySearchString,
    selectIsLastSearchSuccess,
    selectIsSearchEnabled,
    selectSearchString,
    setSearchString,
} from './slice';

export interface SearchRecipeInputProps extends BoxProps {
    onSearchStart?: () => void;
}

export const SearchRecipeInput = ({ onSearchStart, ...props }: SearchRecipeInputProps) => {
    const isLastSearchSuccess = useAppSelector(selectIsLastSearchSuccess);
    const value = useAppSelector(selectSearchString);
    const isSearchEnabled = useAppSelector(selectIsSearchEnabled);
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const search = () => {
        dispatch(applySearchString());
        onSearchStart?.();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchString(e.currentTarget.value));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isSearchEnabled) {
            search();
        }
    };

    const handleClick = () => {
        if (isSearchEnabled) {
            search();
        }
    };

    return (
        <InputGroup
            size={{ base: 'sm', lg: 'lg' }}
            borderColor={isLastSearchSuccess === true ? 'lime.600' : undefined}
            {...props}
        >
            <Input
                ref={inputRef}
                isInvalid={isLastSearchSuccess === false}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                borderRadius={{ base: 'base', lg: 'md' }}
                placeholder='Название или ингридиент...'
                data-test-id={TestId.SEARCH_INPUT}
            />
            <InputRightElement>
                <IconButton
                    disabled={!isSearchEnabled}
                    icon={<SearchIcon />}
                    onClick={handleClick}
                    variant='unstyled'
                    display='flex'
                    size={{ base: 'sm', lg: 'lg' }}
                    aria-label='Искать'
                    data-test-id={TestId.SEARCH_BUTTON}
                />
            </InputRightElement>
        </InputGroup>
    );
};
