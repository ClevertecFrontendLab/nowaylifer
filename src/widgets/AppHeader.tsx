import { ChevronRightIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    HStack,
    IconButton,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router';

import { Logo } from '~/shared/ui/Logo';
import { BookmarksStat, FriendsStat, LikesStat } from '~/shared/ui/Stats';
import { useBreadcrumbs } from '~/shared/use-breadcrumbs';

const AppHeaderLogo = () => {
    const variant = useBreakpointValue({ base: 'short', md: 'normal' } as const);
    return <Logo h={8} w='auto' variant={variant} />;
};

export const AppHeader = () => {
    const breadcrumbs = useBreadcrumbs();
    return (
        <Flex as='header' align='center' p={4} bg='lime.50' data-test-id='header'>
            <AppHeaderLogo />
            <Breadcrumb
                ml={16}
                spacing={0}
                hideBelow='lg'
                separator={<ChevronRightIcon color='gray.800' w='22px' h={6} />}
            >
                {breadcrumbs.map((breadcrumb) => (
                    <BreadcrumbItem key={breadcrumb.pathname} isCurrentPage={breadcrumb.active}>
                        <BreadcrumbLink
                            as={ReactRouterLink}
                            to={breadcrumb.pathname}
                            color='blackAlpha.700'
                            _activeLink={{ color: 'black' }}
                        >
                            {breadcrumb.label}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
            <HStack hideBelow='lg' ml='auto' mr={16} gap={3}>
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
            <HStack hideFrom='lg' ml='auto'>
                <BookmarksStat px={2} value={185} />
                <FriendsStat px={2} value={589} />
                <LikesStat px={2} value={587} />
            </HStack>
            <IconButton
                display='flex'
                variant='unstyled'
                aria-label='Открыть список фильтров'
                boxSize={6}
                ml={4}
                hideFrom='lg'
                icon={<HamburgerIcon />}
            />
        </Flex>
    );
};
