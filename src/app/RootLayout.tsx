import { Box, Circle, Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { BookmarkIcon } from '~/shared/ui/BookmarkIcon';
import { Button } from '~/shared/ui/Button';
import { EmojiHeartEyesIcon } from '~/shared/ui/EmojiHeartEyesIcon';
import { PenIcon } from '~/shared/ui/PenIcon';
import { PeopleIcon } from '~/shared/ui/PeopleIcon';
import { AppHeader } from '~/widgets/AppHeader';
import { SidebarMenu } from '~/widgets/SidebarMenu';

export default function RootLayout() {
    return (
        <Grid
            templateAreas={`"header    header header"
                            "side-menu main   side-profile"`}
            gridTemplateRows='80px calc(100% - 80px)'
            gridTemplateColumns='auto 1fr auto'
            h='100dvh'
        >
            <GridItem area='header' zIndex='docked'>
                <AppHeader />
            </GridItem>
            <GridItem area='side-menu' hideBelow='lg' w='2xs'>
                <SidebarMenu />
            </GridItem>
            <GridItem area='main'>
                <Outlet />
            </GridItem>
            <GridItem area='side-profile' hideBelow='xl'>
                <VStack h='full' justifyContent='space-between' pt={4}>
                    <VStack gap={6}>
                        <HStack gap={1} py={2} px={4} justify='start'>
                            <BookmarkIcon boxSize={4} />
                            <Box fontWeight='semibold' color='lime.600'>
                                185
                            </Box>
                        </HStack>
                        <HStack gap={1} py={2} px={4} justify='start'>
                            <PeopleIcon boxSize={4} />
                            <Box fontWeight='semibold' color='lime.600'>
                                589
                            </Box>
                        </HStack>
                        <HStack gap={1} py={2} px={4}>
                            <EmojiHeartEyesIcon boxSize={4} />
                            <Box fontWeight='semibold' color='lime.600'>
                                587
                            </Box>
                        </HStack>
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
