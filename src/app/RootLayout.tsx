import { Circle, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Button } from '~/shared/ui/Button';
import { PenIcon } from '~/shared/ui/PenIcon';
import { BookmarksStat, FriendsStat, LikesStat } from '~/shared/ui/Stats';
import { AppHeader } from '~/widgets/AppHeader';
import { SidebarMenu } from '~/widgets/SidebarMenu';

export default function RootLayout() {
    return (
        <Grid
            templateAreas={`"header    header header"
                            "side-menu main   side-profile"`}
            gridTemplateRows='auto 1fr'
            gridTemplateColumns='auto 1fr auto'
            h='100dvh'
        >
            <GridItem area='header' zIndex='docked'>
                <AppHeader />
            </GridItem>
            <GridItem area='side-menu' minH='full' hideBelow='lg' w='2xs'>
                <SidebarMenu />
            </GridItem>
            <GridItem area='main'>
                <Outlet />
            </GridItem>
            <GridItem area='side-profile' hideBelow='xl'>
                <VStack h='full' justifyContent='space-between' pt={4}>
                    <VStack gap={6}>
                        <BookmarksStat fontSize='md' value={185} />
                        <FriendsStat fontSize='md' value={589} />
                        <LikesStat fontSize='md' value={587} />
                    </VStack>
                    <HStack
                        justify='center'
                        boxSize='208px'
                        bgGradient='radial(50% 50% at center, rgba(var(--chakra-colors-lime-300-rgb), 0.7), transparent)'
                    >
                        <Button
                            _hover={{ bg: 'transparent' }}
                            fontWeight='normal'
                            iconSpacing={3}
                            variant='ghost'
                            fontSize='xs'
                            topIcon={
                                <Circle size={12} bg='black' color='lime.50'>
                                    <PenIcon boxSize={6} />
                                </Circle>
                            }
                        >
                            Записать рецепт
                        </Button>
                    </HStack>
                </VStack>
            </GridItem>
        </Grid>
    );
}
