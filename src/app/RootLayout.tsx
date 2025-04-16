import { Circle, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Button } from '~/shared/ui/Button';
import { PenIcon } from '~/shared/ui/PenIcon';
import { BookmarksStat, FriendsStat, LikesStat } from '~/shared/ui/Stats';
import { AppHeader } from '~/widgets/AppHeader';
import { BottomMenu } from '~/widgets/BottomMenu';
import { SidebarMenu } from '~/widgets/SidebarMenu';

export default function RootLayout() {
    return (
        <Grid
            templateAreas={`"header      header      header"
                            "side-menu   main        side-profile"
                            "bottom-menu bottom-menu bottom-menu"`}
            gridTemplateRows='auto 1fr auto'
            gridTemplateColumns='auto 1fr auto'
            minH='100vh'
        >
            <GridItem area='header' zIndex='docked' position='sticky' top={0} minW={0}>
                <AppHeader />
            </GridItem>
            <GridItem
                area='side-menu'
                position='sticky'
                top='var(--app-header-height)'
                h='calc(100vh - var(--app-header-height))'
                alignSelf='start'
                hideBelow='xl'
                w='2xs'
                minW={0}
            >
                <SidebarMenu />
            </GridItem>
            <GridItem
                area='main'
                minW={0}
                maxW={{ base: 'full', lg: '928px', '2xl': '1408px' }}
                mx={{ base: 'auto', xl: '0' }}
                px={{ base: 4, md: 5, lg: 6 }}
            >
                <Outlet />
            </GridItem>
            <GridItem
                minW={0}
                area='side-profile'
                position='sticky'
                top='var(--app-header-height)'
                h='calc(100vh - var(--app-header-height))'
                alignSelf='start'
                hideBelow='xl'
            >
                <VStack as='aside' h='full' justifyContent='space-between' pt={4}>
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
            <GridItem area='bottom-menu' hideFrom='lg' position='sticky' bottom={0} minW={0}>
                <BottomMenu />
            </GridItem>
        </Grid>
    );
}
