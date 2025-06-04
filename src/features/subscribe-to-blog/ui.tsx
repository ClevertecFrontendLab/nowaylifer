import { Button, ButtonProps } from '@chakra-ui/react';

import { PersonPlusIcon } from '~/shared/ui/icons/person-plus';

export interface BlogSubscriptionButtonProps extends ButtonProps {
    isSubscribed?: boolean;
}

export const BlogSubscriptionButton = ({ isSubscribed, ...props }: BlogSubscriptionButtonProps) => (
    <Button
        leftIcon={<PersonPlusIcon />}
        variant={isSubscribed ? 'outline' : 'inverted'}
        {...props}
    >
        {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
    </Button>
);
