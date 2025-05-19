import { Avatar, Box, Flex, HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { Breadcrumbs } from '~/features/breadcrumbs';
import userAvatarUrl from '~/shared/assets/user.png';
import { TestId } from '~/shared/test-ids';
import { Logo } from '~/shared/ui/logo';
import { BookmarksStat, FriendsStat, LikesStat } from '~/shared/ui/stats';

import classes from './app-header.module.css';
import { HamburgerMenu, HamburgerMenuButton, HamburgerMenuOverlay } from './hamburger-menu';

const AppHeaderLogo = () => {
    const variant = useBreakpointValue({ base: 'short', md: 'normal' } as const);
    return <Logo h={8} w='auto' variant={variant} />;
};

export const AppHeader = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const xl = useBreakpointValue({ base: false, xl: true });

    useEffect(() => {
        if (xl) {
            containerRef.current?.removeAttribute('data-menu-open');
        }
    }, [xl]);

    return (
        <Flex
            ref={containerRef}
            as='header'
            align='center'
            p={4}
            className={classes.header}
            data-test-id={TestId.HEADER}
        >
            <AppHeaderLogo />
            {xl && <Breadcrumbs ml={{ base: 16, xl: 32 }} />}
            <HStack hideBelow='xl' ml='auto' mr={{ base: 8, xl: 16 }} gap={3}>
                <Avatar size='md' name='bake_and_pie' src={userAvatarUrl} />
                <Box>
                    <Text fontSize='lg' fontWeight='medium'>
                        Екатерина Константинопольская
                    </Text>
                    <Text fontSize='sm' color='blackAlpha.700'>
                        @bake_and_pie
                    </Text>
                </Box>
            </HStack>
            <HStack hideFrom='xl' ml='auto' fontSize='xs' className={classes.stats}>
                <BookmarksStat px={2} value={185} />
                <FriendsStat px={2} value={589} />
                <LikesStat px={2} value={587} />
            </HStack>
            <HamburgerMenu
                onOpenChange={(isOpen) => {
                    if (isOpen) {
                        containerRef.current?.setAttribute('data-menu-open', '');
                    } else {
                        containerRef.current?.removeAttribute('data-menu-open');
                    }
                }}
            >
                <HamburgerMenuButton hideFrom='xl' />
                <HamburgerMenuOverlay />
            </HamburgerMenu>
        </Flex>
    );
};
