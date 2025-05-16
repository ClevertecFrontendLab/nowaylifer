import { Box, BoxProps, Portal } from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';
import { Loader } from '~/shared/ui/loader';

export const AppLoaderSpinner = ({
    withOverlay = true,
    ...props
}: BoxProps & { withOverlay?: boolean }) => (
    <Portal>
        <Box
            inset={0}
            pos='fixed'
            h='full'
            display='flex'
            alignItems='center'
            justifyContent='center'
            zIndex='appLoader'
            transitionProperty='opacity'
            transitionDuration='fast'
            {...props}
        >
            {withOverlay && <AppLoaderOverlay />}
            <Loader zIndex={1} size={{ base: 'sm', lg: 'md' }} data-test-id={TestId.APP_LOADER} />
        </Box>
    </Portal>
);

const AppLoaderOverlay = (props: BoxProps) => (
    <Box pos='absolute' inset={0} bg='blackAlpha.300' backdropFilter='blur(2px)' {...props} />
);
