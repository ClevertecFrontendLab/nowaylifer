import { Avatar, Box, Flex, HStack, Text } from '@chakra-ui/react';

import { Logo } from '~/shared/ui/Logo';

export const AppHeader = () => (
    <Flex as='header' align='center' p={4} bg='lime.50'>
        <Logo height='32px' width='135px' />
        <Text ml={16}>Главная</Text>
        <HStack ml='auto' mr={16} gap={3}>
            <Avatar size='md' name='bake_and_pie' src='/images/Breakfast.png' />
            <Box>
                <Text fontSize='lg' fontWeight='medium'>
                    Екатерина Константинопольская
                </Text>
                <Text fontSize='sm' color='blackAlpha.700'>
                    @bake_and_pie
                </Text>
            </Box>
        </HStack>
    </Flex>
);
