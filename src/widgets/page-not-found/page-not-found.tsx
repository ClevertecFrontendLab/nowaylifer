import { Box, Center, Heading, Image, Text } from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';
import { Link } from '~/shared/ui/link';

import imageUrl from './404.png';

export const PageNotFound = () => (
    <Center h='full' w='full'>
        <Box p={10} maxW={{ base: '316px', lg: 'none' }} textAlign='center'>
            <Image boxSize={{ base: '108px', lg: '206px' }} src={imageUrl} mx='auto' mb={8} />
            <Heading as='h1' fontWeight='bold' fontSize='2xl' mb={4}>
                Упс! Такой страницы нет
            </Heading>
            <Text color='blackAlpha.700'>
                Можете поискать другой рецепт{' '}
                <Link textDecoration='underline' to='/' data-test-id={TestId.PAGE_NOT_FOUND_LINK}>
                    здесь.
                </Link>
            </Text>
        </Box>
    </Center>
);
