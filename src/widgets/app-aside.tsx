import { Circle, HStack, VStack } from '@chakra-ui/react';
import { memo } from 'react';

import { RoutePath } from '~/shared/router';
import { Button } from '~/shared/ui/button';
import { PencilIcon } from '~/shared/ui/icons/pencil';
import { Link } from '~/shared/ui/link';
import { BookmarksStat, FriendsStat, LikesStat } from '~/shared/ui/stats';

export const AppAside = memo(() => (
    <VStack as='aside' h='full' justifyContent='space-between' pt={4}>
        <VStack gap={6}>
            <BookmarksStat fontSize='md' value={185} />
            <FriendsStat fontSize='md' value={589} />
            <LikesStat fontSize='md' value={587} />
        </VStack>
        <HStack justify='center' boxSize='208px' className='glow-circle'>
            <Button
                as={Link}
                to={RoutePath.NewRecipe}
                _hover={{ bg: 'transparent' }}
                fontWeight='normal'
                iconSpacing={3}
                variant='ghost'
                fontSize='xs'
                topIcon={
                    <Circle size={12} bg='black' color='lime.50'>
                        <PencilIcon boxSize={6} />
                    </Circle>
                }
            >
                Записать рецепт
            </Button>
        </HStack>
    </VStack>
));
