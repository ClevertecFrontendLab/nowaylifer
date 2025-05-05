import { useRef } from 'react';

import { useAppDispatch } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
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
} from '~/shared/ui/drawer';

import { applyFilters, resetFilters, setIsAppliedFromDrawer } from '../slice';
import { FilterButton } from './filter-button';
import { Filters } from './filters';

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
                <DrawerContent
                    maxW={{ base: '344px', lg: '463px' }}
                    data-test-id={TestId.FILTER_DRAWER}
                >
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
                            data-test-id={TestId.FILTER_DRAWER_CLOSE}
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
                                dispatch(setIsAppliedFromDrawer(true));
                                setTimeout(() => dispatch(setIsAppliedFromDrawer(false)), 500);
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
        <FilterButton data-test-id={TestId.FILTER_DRAWER_TRIGGER} />
    </DrawerTrigger>
);
