import { Box, Button, Icon, IconProps, Text } from '@chakra-ui/react';
import { useLayoutEffect, useRef } from 'react';

import { FoodMenu } from './FoodMenu';
import classes from './SidebarMenu.module.css';

export const SidebarMenu = () => {
    const spaceRef = useRef<HTMLDivElement>(null);
    const scrollableRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!spaceRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            const scrollEl = scrollableRef.current;
            if (!scrollEl) return;

            if (entry.borderBoxSize[0].blockSize <= 0) {
                scrollEl.classList.add(classes.elevated);
            } else {
                scrollEl.classList.remove(classes.elevated);
            }
        });

        observer.observe(spaceRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <Box
            h='full'
            py={6}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            className={classes.sidebar}
        >
            <Box
                ref={scrollableRef}
                className='custom-scrollbar'
                overflowX='hidden'
                overflowY='auto'
                borderRadius='xl'
                minH={0}
                pl={2.5}
                pr={1}
            >
                <FoodMenu />
            </Box>
            <Box ref={spaceRef} flex={1} />
            <Box px={6}>
                <Text color='blackAlpha.400' fontSize='xs' fontWeight='medium' mb={4}>
                    Версия программы 03.25
                </Text>
                <Text color='blackAlpha.700' fontSize='sm' mb={4}>
                    Все права защищены,
                    <br />
                    ученический файл,
                    <br />
                    ©Клевер Технолоджи, 2025
                </Text>
                <Button
                    leftIcon={<ExitIcon w={3} h={3} />}
                    variant='link'
                    color='black'
                    fontSize='xs'
                    fontWeight='semibold'
                >
                    Выйти
                </Button>
            </Box>
        </Box>
    );
};

const ExitIcon = (props: IconProps) => (
    <Icon viewBox='0 0 12 12' {...props}>
        <path d='M8 6.5V5.5H3.5V4L1 6L3.5 8V6.5H8Z' fill='black' />
        <path
            d='M10 1.5H5.5C4.9485 1.5 4.5 1.9485 4.5 2.5V4.5H5.5V2.5H10V9.5H5.5V7.5H4.5V9.5C4.5 10.0515 4.9485 10.5 5.5 10.5H10C10.5515 10.5 11 10.0515 11 9.5V2.5C11 1.9485 10.5515 1.5 10 1.5Z'
            fill='black'
        />
    </Icon>
);
