import { Box, BoxProps, Portal } from '@chakra-ui/react';
import { RemoveScroll } from 'react-remove-scroll';

import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Loader } from '~/shared/ui/loader';

import { selectIsAppLoaderOverlayEnabled, selectIsAppLoaderRunning } from './slice';

export const AppLoaderContainer = () => {
    const isRunning = useAppSelector(selectIsAppLoaderRunning);
    const withOverlay = useAppSelector(selectIsAppLoaderOverlayEnabled);
    return (
        <Portal>
            <RemoveScroll enabled={isRunning}>
                {isRunning && (
                    <Box
                        pos='fixed'
                        inset={0}
                        h='full'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        zIndex='appLoader'
                    >
                        {withOverlay && <Overlay />}
                        <Loader size={{ base: 'sm', lg: 'md' }} data-test-id={TestId.APP_LOADER} />
                    </Box>
                )}
            </RemoveScroll>
        </Portal>
    );
};

const Overlay = (props: BoxProps) => (
    <Box pos='absolute' inset={0} bg='blackAlpha.300' backdropFilter='blur(1.5px)' {...props} />
);
