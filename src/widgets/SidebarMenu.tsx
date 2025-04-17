import { Box, BoxProps } from '@chakra-ui/react';
import { useLayoutEffect, useRef } from 'react';

import { RecipeMenu } from '~/features/recipe-menu';
import { About } from '~/shared/ui/About';
import { ExitButton } from '~/shared/ui/ExitButton';

import classes from './SidebarMenu.module.css';

export const SidebarMenu = (props: BoxProps) => {
    const spaceRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!spaceRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            const scrollEl = menuRef.current;
            if (entry.borderBoxSize[0].blockSize <= 0) {
                scrollEl?.classList.add(classes.elevated);
            } else {
                scrollEl?.classList.remove(classes.elevated);
            }
        });

        observer.observe(spaceRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <Box
            as='aside'
            h='full'
            py={6}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            className={classes.sidebar}
            {...props}
        >
            <RecipeMenu ref={menuRef} minH={0} borderBottomRadius='xl' />
            <Box ref={spaceRef} flex={1} />
            <Box px={6}>
                <About />
                <ExitButton />
            </Box>
        </Box>
    );
};
