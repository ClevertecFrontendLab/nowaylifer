import { Circle, HStack, Spacer, StackProps, VStack } from '@chakra-ui/react';
import { memo } from 'react';

import { RoutePath } from '~/shared/router';
import { TestId } from '~/shared/test-ids';
import { Button } from '~/shared/ui/button';
import { PencilIcon } from '~/shared/ui/icons/pencil';
import { Link } from '~/shared/ui/link';
import { BookmarksStat, LikesStat, SubscribersStat } from '~/shared/ui/stats';

export const AppAside = memo((props: StackProps) => (
    <VStack as='aside' h='full' pt={4} {...props}>
        <VStack gap={6}>
            <BookmarksStat fontSize='md' value={185} />
            <SubscribersStat fontSize='md' value={589} />
            <LikesStat fontSize='md' value={587} />
        </VStack>
        <Spacer />
        <HStack justify='center' boxSize='208px' className='glow-circle'>
            <Button
                as={Link}
                to={RoutePath.NewRecipe}
                _hover={{ bg: 'transparent' }}
                fontWeight='normal'
                iconSpacing={3}
                variant='ghost'
                fontSize='xs'
                data-test-id={TestId.RECIPE_ADD_BUTTON}
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
