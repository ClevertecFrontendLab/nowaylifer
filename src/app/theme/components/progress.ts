import { progressAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const Progress = createMultiStyleConfigHelpers(progressAnatomy.keys).defineMultiStyleConfig({
    baseStyle: {
        track: {
            bgColor: 'blackAlpha.100',
        },
        filledTrack: {
            bgColor: 'lime.300',
        },
    },
});
