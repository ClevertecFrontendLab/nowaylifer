import { Avatar, Box, Flex, HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { Breadcrumbs } from '~/features/breadcrumbs';
import { Logo } from '~/shared/ui/Logo';
import { BookmarksStat, FriendsStat, LikesStat } from '~/shared/ui/Stats';

import classes from './AppHeader.module.css';
import { HamburgerMenu, HamburgerMenuButton, HamburgerMenuOverlay } from './HamburgerMenu';

const AppHeaderLogo = () => {
    const variant = useBreakpointValue({ base: 'short', md: 'normal' } as const);
    return <Logo h={8} w='auto' variant={variant} />;
};

export const AppHeader = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lg = useBreakpointValue({ base: false, lg: true });

    useEffect(() => {
        if (lg) {
            containerRef.current?.removeAttribute('data-menu-open');
        }
    }, [lg]);

    return (
        <Flex
            ref={containerRef}
            as='header'
            align='center'
            p={4}
            className={classes.header}
            data-test-id='header'
        >
            <AppHeaderLogo />
            {lg && <Breadcrumbs ml={{ base: 16, xl: 32 }} />}
            <HStack hideBelow='lg' ml='auto' mr={{ base: 8, xl: 16 }} gap={3}>
                <Avatar size='md' name='bake_and_pie' src='/images/user.png' />
                <Box>
                    <Text fontSize='lg' fontWeight='medium'>
                        Екатерина Константинопольская
                    </Text>
                    <Text fontSize='sm' color='blackAlpha.700'>
                        @bake_and_pie
                    </Text>
                </Box>
            </HStack>
            <HStack hideFrom='lg' ml='auto' fontSize='xs' className={classes.stats}>
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
                <HamburgerMenuButton hideFrom='lg' />
                <HamburgerMenuOverlay />
            </HamburgerMenu>
        </Flex>
    );
};
