import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { AppHeader } from '~/shared/ui/AppHeader';

export default function RootLayout() {
    return (
        <Box h='100dvh'>
            <AppHeader />
            <Outlet />
        </Box>
    );
}
