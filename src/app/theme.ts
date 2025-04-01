// @ts-expect-error seems like a bug https://github.com/fontsource/fontsource/issues/1038
import '@fontsource-variable/inter';

import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    colors: {
        lime: {
            50: '#ffffd3',
        },
    },
    fonts: {
        body: 'Inter Variable, sans-serif',
    },
});
