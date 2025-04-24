import { useRef } from 'react';

import { useAppDispatch } from '~/shared/store';
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerContext,
    DrawerHandle,
    DrawerHeader,
    DrawerOverlay,
    DrawerTrigger,
} from '~/shared/ui/Drawer';

import { applyFilters, resetFilters } from '../slice';
import { FilterButton } from './FilterButton';
import { Filters } from './Filters';

export const FilterDrawer = ({ children }: { children?: React.ReactNode }) => {
    const drawerRef = useRef<DrawerHandle>(null);
    const dispatch = useAppDispatch();
    return (
        <DrawerContext ref={drawerRef}>
            {children}
            <Drawer
                placement='right'
                preserveScrollBarGap={false}
                onCloseComplete={() => dispatch(resetFilters())}
            >
                <DrawerOverlay />
                <DrawerContent maxW={{ base: '344px', lg: '463px' }} data-test-id='filter-drawer'>
                    <DrawerHeader
                        fontSize='2xl'
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        fontWeight='bold'
                        pt={{ base: 4, lg: 8 }}
                        pl={{ base: 4, lg: 8 }}
                        pr={{ base: 5, lg: 8 }}
                        pb={4}
                    >
                        Фильтр
                        <DrawerCloseButton
                            size='sm'
                            pos='static'
                            variant='inverted'
                            borderRadius='full'
                            data-test-id='close-filter-drawer'
                        />
                    </DrawerHeader>
                    <DrawerBody
                        className='custom-scrollbar'
                        sx={{
                            '::-webkit-scrollbar-track': { mb: { base: 4, lg: 8 } },
                            scrollbarGutter: 'stable',
                        }}
                        pt={{ base: 4, lg: 6 }}
                        pl={{ base: 4, lg: 8 }}
                        pr={{ base: 3.5, lg: 6.5 }}
                        pb={{ base: 4, lg: 8 }}
                        mr={1.5}
                    >
                        <Filters
                            onClear={() => {
                                dispatch(resetFilters());
                                dispatch(applyFilters());
                            }}
                            onFind={() => {
                                dispatch(applyFilters());
                                drawerRef.current?.close();
                            }}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </DrawerContext>
    );
};

export const FilterDrawerTrigger = () => (
    <DrawerTrigger>
        <FilterButton data-test-id='filter-button' />
    </DrawerTrigger>
);
