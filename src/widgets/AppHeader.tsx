import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Flex,
    HStack,
    IconButton,
    Text,
    useMediaQuery,
    useTheme,
} from '@chakra-ui/react';

import { Logo } from '~/shared/ui/Logo';
import { BookmarksStat, FriendsStat, LikesStat } from '~/shared/ui/Stats';

const AppHeaderLogo = () => {
    const theme = useTheme<ChakraTheme>();
    const [md] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
    return <Logo h={8} w='auto' variant={md ? 'normal' : 'short'} />;
};

export const AppHeader = () => (
    <Flex as='header' align='center' p={4} bg='lime.50'>
        <AppHeaderLogo />
        <Text hideBelow='lg' ml={16}>
            Главная
        </Text>
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
