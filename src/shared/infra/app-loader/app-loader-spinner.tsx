import { Box, BoxProps, Portal } from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';
import { Loader } from '~/shared/ui/loader';

export const AppLoaderSpinner = (props: BoxProps) => (
    <Portal>
        <Box
            inset={0}
            pos='fixed'
            h='full'
            display='flex'
            alignItems='center'
            justifyContent='center'
            zIndex='overlay'
            bg='blackAlpha.300'
            backdropFilter='auto'
            backdropBlur='1px'
            transitionProperty='opacity'
            transitionDuration='fast'
            {...props}
        >
            <Loader size={{ base: 'sm', lg: 'md' }} data-test-id={TestId.APP_LOADER} />
        </Box>
    </Portal>
);
