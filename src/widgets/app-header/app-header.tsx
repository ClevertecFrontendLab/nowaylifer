import {
    Avatar,
    Box,
    cssVar,
    defineStyle,
    Flex,
    HStack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { memo, useEffect, useRef, useState } from 'react';

import { Breadcrumbs } from '~/features/breadcrumbs';
import userAvatarUrl from '~/shared/assets/user.png';
import { TestId } from '~/shared/test-ids';
import { Logo } from '~/shared/ui/logo';
import { BookmarksStat, FriendsStat, LikesStat } from '~/shared/ui/stats';

import { HamburgerMenu, HamburgerMenuButton, HamburgerMenuOverlay } from './hamburger-menu';

const $bg = cssVar('bg');

const headerBefore = defineStyle({
    content: "''",
    pos: 'fixed',
    inset: 'auto 0',
    zIndex: -1,
    height: 'var(--app-header-height)',
    background: $bg.reference,
});

export const AppHeader = memo(() => {
    const containerRef = useRef<HTMLDivElement>(null);
    const xl = useBreakpointValue({ base: false, xl: true });
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    useEffect(() => {
        if (xl) {
            setMenuIsOpen(false);
        }
    }, [xl]);

    return (
        <Flex
            ref={containerRef}
            as='header'
            align='center'
            data-group
            p={4}
            sx={{
                [$bg.variable]: menuIsOpen ? 'white' : 'colors.lime.50',
                bg: $bg.reference,
                pos: 'static !important',
            }}
            _before={headerBefore}
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
            <HStack
                visibility={menuIsOpen ? 'hidden' : 'visible'}
                hideFrom='xl'
                fontSize='xs'
                ml='auto'
            >
                <BookmarksStat px={2} value={185} />
                <FriendsStat px={2} value={589} />
                <LikesStat px={2} value={587} />
            </HStack>
            <HamburgerMenu
                isOpen={menuIsOpen}
                onOpenChange={setMenuIsOpen}
                closeOnBlur={(e) =>
                    !(e.target instanceof Node && containerRef.current?.contains(e.target))
                }
            >
                <HamburgerMenuButton hideFrom='xl' />
                <HamburgerMenuOverlay />
            </HamburgerMenu>
        </Flex>
    );
});

const AppHeaderLogo = () => {
    const variant = useBreakpointValue({ base: 'short', md: 'normal' } as const);
    return <Logo h={8} w='auto' variant={variant} />;
};
