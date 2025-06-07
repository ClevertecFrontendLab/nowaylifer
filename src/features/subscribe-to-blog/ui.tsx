import { Button, ButtonProps } from '@chakra-ui/react';

import { PersonPlusIcon } from '~/shared/ui/icons/person-plus';

export interface BlogSubscriptionButtonProps extends ButtonProps {
    isSubscribed?: boolean;
}

export const BlogSubscriptionButton = ({ isSubscribed, ...props }: BlogSubscriptionButtonProps) => (
    <Button
        size='xs'
        _disabled={{}}
        lineHeight={4}
        iconSpacing={1.5}
        variant={isSubscribed ? 'outline' : 'inverted'}
        leftIcon={<PersonPlusIcon withPlus={!isSubscribed} />}
        {...props}
    >
        {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
    </Button>
);
