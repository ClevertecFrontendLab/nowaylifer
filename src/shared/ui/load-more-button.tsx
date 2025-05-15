import { Button, ButtonProps } from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';

export const LoadMoreButton = ({ isLoading, ...props }: ButtonProps) => (
    <Button
        variant='solid'
        bg='lime.400'
        size={{ base: 'md', '2xl': 'lg' }}
        loadingText='Загрузка'
        isLoading={isLoading}
        disabled={isLoading}
        data-test-id={TestId.LOAD_MORE_BUTTON}
        {...props}
    >
        Загрузить еще
    </Button>
);
