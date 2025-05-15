import { Box, BoxProps, Spacer } from '@chakra-ui/react';
import { useResizeObserver } from '@react-hookz/web';
import { useRef } from 'react';

import { CategoryNav } from '~/entities/category';
import { TestId } from '~/shared/test-ids';
import { About } from '~/shared/ui/about';
import { ExitButton } from '~/shared/ui/exit-button';

import classes from './sidebar-menu.module.css';

export const SidebarMenu = (props: BoxProps) => {
    const spacerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useResizeObserver(spacerRef, (entry) => {
        const navEl = navRef.current;
        if (entry.borderBoxSize[0].blockSize <= 0) {
            navEl?.classList.add(classes.elevated);
        } else {
            navEl?.classList.remove(classes.elevated);
        }
    });

    return (
        <Box
            as='aside'
            h='full'
            py={6}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            className={classes.sidebar}
            data-test-id={TestId.NAV}
            {...props}
        >
            <CategoryNav
                ref={navRef}
                borderBottomRadius='xl'
                sx={{
                    '::-webkit-scrollbar-track': { mb: 2 },
                    scrollbarGutter: 'stable',
                }}
            />
            <Spacer ref={spacerRef} />
            <Box px={6}>
                <About />
                <ExitButton />
            </Box>
        </Box>
    );
};
