import { alertAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const Alert = createMultiStyleConfigHelpers(alertAnatomy.keys).defineMultiStyleConfig({
    variants: {
        solid: ({ colorScheme: c }) => ({
            container: {
                ['--alert-bg']: `colors.${c}.500`,
            },
        }),
    },
});
