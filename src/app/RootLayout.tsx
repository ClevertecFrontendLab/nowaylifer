import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { AppHeader } from '~/widgets/AppHeader';
import { SidebarMenu } from '~/widgets/SidebarMenu';

export default function RootLayout() {
    return (
        <Grid
            templateAreas={`"header    header header"
                            "side-menu main   side-profile"`}
            gridTemplateRows='80px calc(100% - 80px)'
            gridTemplateColumns='256px 1fr 256px'
            h='100dvh'
        >
            <GridItem area='header' zIndex='docked'>
                <AppHeader />
            </GridItem>
            <GridItem area='side-menu' hideBelow='lg'>
                <SidebarMenu />
            </GridItem>
            <GridItem area='main'>
                <Outlet />
            </GridItem>
            <GridItem area='side-profile' hideBelow='xl'>
                <Box>PROFILE INFO</Box>
            </GridItem>
        </Grid>
    );
}
