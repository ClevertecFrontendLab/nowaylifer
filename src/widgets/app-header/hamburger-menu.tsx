import { CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    BoxProps,
    forwardRef,
    Icon,
    IconButton,
    IconButtonProps,
    IconProps,
    Menu,
    MenuButton,
    MenuButtonProps,
    MenuList,
    MenuProps,
    Portal,
    Spacer,
    useControllableState,
    useOutsideClick,
} from '@chakra-ui/react';
import React, { cloneElement, isValidElement, useRef } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { CategoryNav } from '~/entities/category';
import { Breadcrumbs } from '~/features/breadcrumbs';
import { TestId } from '~/shared/test-ids';
import { About } from '~/shared/ui/about';
import { ExitButton } from '~/shared/ui/exit-button';

import classes from './hamburger-menu.module.css';

export interface HamburgerMenuProps
    extends Omit<MenuProps, 'onOpen' | 'onClose' | 'children' | 'closeOnBlur'> {
    onOpenChange?: (isOpen: boolean) => void;
    isOpen?: boolean;
    children?: React.ReactNode;
    closeOnBlur?: (event: Event) => boolean;
}

export const HamburgerMenu = ({
    onOpenChange,
    closeOnBlur,
    isOpen,
    children,
    ...props
}: HamburgerMenuProps) => {
    const menuListRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useControllableState({
        value: isOpen,
        onChange: onOpenChange,
        defaultValue: false,
    });

    useOutsideClick({
        ref: menuListRef,
        handler: (e) => {
            if (!closeOnBlur || closeOnBlur(e)) {
                setIsMenuOpen(false);
            }
        },
    });

    return (
        <Menu
            strategy='fixed'
            placement='bottom-end'
            offset={[8, 16]}
            closeOnBlur={false}
            isOpen={isMenuOpen}
            onOpen={() => setIsMenuOpen(true)}
            onClose={() => setIsMenuOpen(false)}
            // isLazy
            {...props}
        >
            {({ isOpen, onClose }) => (
                <>
                    {React.Children.map(children, (child) =>
                        isValidElement<{ isOpen?: boolean }>(child)
                            ? cloneElement<{ isOpen?: boolean }>(child, { isOpen })
                            : child,
                    )}
                    <Portal>
                        <RemoveScroll enabled={isOpen}>
                            <MenuList
                                ref={menuListRef}
                                rootProps={{ className: classes.containerMenu }}
                                className={classes.menu}
                                display='flex'
                                flexDir='column'
                                justifyContent='space-between'
                                w='344px'
                                border='none'
                                borderTopRadius='none'
                                borderBottomRadius='xl'
                                pb={8}
                                pt={4}
                            >
                                <Box
                                    display='flex'
                                    flexDir='column'
                                    minH={0}
                                    h='full'
                                    data-test-id={TestId.NAV}
                                >
                                    <Breadcrumbs
                                        onBreadcrumbClick={(_, isActive) => !isActive && onClose()}
                                        px={5}
                                        mb={3}
                                        wrap
                                    />
                                    <CategoryNav pr={5} />
                                    <Spacer />
                                    <Box pt={4} px={6}>
                                        <About />
                                        <ExitButton />
                                    </Box>
                                </Box>
                            </MenuList>
                        </RemoveScroll>
                    </Portal>
                </>
            )}
        </Menu>
    );
};

export const HamburgerMenuOverlay = ({ isOpen, ...rest }: { isOpen?: boolean } & BoxProps) => (
    <Portal>
        <Box
            inset={0}
            pos='fixed'
            opacity={isOpen ? 1 : 0}
            zIndex='docked'
            pointerEvents='none'
            bg='blackAlpha.300'
            backdropFilter='blur(1.5px)'
            transitionProperty='opacity'
            transitionDuration='fast'
            {...rest}
        />
    </Portal>
);

export const HamburgerMenuButton = (props: { isOpen?: boolean } & MenuButtonProps) => (
    <MenuButton
        as={HamburgerMenuIcon}
        data-test-id={props.isOpen ? TestId.CLOSE_ICON : TestId.HAMBURGER_ICON}
        {...props}
    />
);

const HamburgerMenuIcon = forwardRef<{ isOpen: boolean } & IconButtonProps, 'button'>(
    ({ isOpen, ...rest }, ref) => (
        <IconButton
            ref={ref}
            display='flex'
            variant='unstyled'
            ml={4}
            size='sm'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon boxSize={6} />}
            {...rest}
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        />
    ),
);

const HamburgerIcon = (props: IconProps) => (
    <Icon viewBox='0 0 24 24' boxSize='1em' {...props}>
        <path d='M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z' fill='currentColor' />
    </Icon>
);
