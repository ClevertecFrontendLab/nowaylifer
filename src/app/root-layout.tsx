import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { matchPath, Outlet, useLocation } from 'react-router';

import { RoutePath } from '~/shared/router';
import { AppAside } from '~/widgets/app-aside';
import { AppHeader } from '~/widgets/app-header';
import { BottomMenu } from '~/widgets/bottom-menu';
import { SidebarMenu } from '~/widgets/side-bar-menu';

const hideAsidePaths = [RoutePath.NewRecipe, RoutePath.EditRecipe.pattern];

export default function RootLayout() {
    const { pathname } = useLocation();
    const xl = useBreakpointValue({ base: false, xl: true });
    const shouldRenderAppAside = !hideAsidePaths.some((path) => matchPath(path, pathname));

    return (
        <Grid
            templateAreas={`"header      header      header"
                            "side-menu   main        app-aside"
                            "bottom-menu bottom-menu bottom-menu"`}
            gridTemplateRows='auto 1fr auto'
            gridTemplateColumns='auto 1fr auto'
            minH='100dvh'
            maxW='1920px'
            mx='auto'
        >
            <GridItem area='header' zIndex='sticky' position='sticky' top={0} minW={0}>
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
                {xl && <SidebarMenu />}
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
                area='app-aside'
                position='sticky'
                top='var(--app-header-height)'
                h='calc(100vh - var(--app-header-height))'
                alignSelf='start'
                hideBelow='xl'
            >
                {shouldRenderAppAside && <AppAside />}
            </GridItem>
            <GridItem
                zIndex='docked'
                area='bottom-menu'
                hideFrom='lg'
                position='sticky'
                bottom={0}
                minW={0}
            >
                <BottomMenu />
            </GridItem>
        </Grid>
    );
}
