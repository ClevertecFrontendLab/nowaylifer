import { Button, ButtonProps, Tooltip } from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';
import { PersonPlusIcon } from '~/shared/ui/icons/person-plus';

export interface BlogSubscriptionButtonProps extends ButtonProps {
    isSubscribed?: boolean;
}

export const BlogSubscriptionButton = ({ isSubscribed, ...props }: BlogSubscriptionButtonProps) => (
    <Tooltip
        hasArrow
        isDisabled={!isSubscribed}
        label='Нажмите, если хотите отписаться'
        bg='blackAlpha.900'
        borderRadius='base'
        color='white'
        offset={[35, 8]}
        data-test-id={TestId.BLOG_TOGGLE_SUBSCRIPTION_TOOLTIP}
        modifiers={[
            {
                name: 'arrow',
                options: {
                    // center arrow relative to popper
                    padding: ({ popper }: { popper: { width: number } }) => popper.width / 2 - 5,
                },
            },
        ]}
        lineHeight={5}
        fontWeight='normal'
        fontSize='sm'
        maxW='144px'
    >
        <Button
            size='xs'
            _disabled={{}}
            lineHeight={4}
            iconSpacing={1.5}
            variant={isSubscribed ? 'outline' : 'inverted'}
            leftIcon={<PersonPlusIcon withPlus={!isSubscribed} />}
            data-test-id={
                isSubscribed ? TestId.BLOG_TOGGLE_UNSUBSCRIBE : TestId.BLOG_TOGGLE_SUBSCRIBE
            }
            {...props}
        >
            {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
        </Button>
    </Tooltip>
);
