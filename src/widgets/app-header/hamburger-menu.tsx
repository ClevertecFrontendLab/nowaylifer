import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    BoxProps,
    forwardRef,
    IconButton,
    IconButtonProps,
    Menu,
    MenuButton,
    MenuButtonProps,
    MenuList,
    Portal,
} from '@chakra-ui/react';
import React, { cloneElement, isValidElement } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { Breadcrumbs } from '~/features/breadcrumbs';
import { RecipeMenu } from '~/features/recipe-menu';
import { TestId } from '~/shared/test-ids';
import { About } from '~/shared/ui/about';
import { ExitButton } from '~/shared/ui/exit-button';

import classes from './hamburger-menu.module.css';

export interface HamburgerMenuProps {
    onOpenChange?: (isOpen: boolean) => void;
    isOpen?: boolean;
    children?: React.ReactNode;
}

export const HamburgerMenu = ({ onOpenChange, isOpen, children }: HamburgerMenuProps) => (
    <Menu
        strategy='fixed'
        placement='bottom-end'
        offset={[8, 16]}
        isOpen={isOpen}
        onOpen={() => onOpenChange?.(true)}
        onClose={() => onOpenChange?.(false)}
        isLazy
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
                            className={classes.container}
                            justifyContent='space-between'
                            flexDir='column'
                            display='flex'
                            border='none'
                            pb={8}
                            pt={4}
                        >
                            <Box display='flex' flexDir='column' minH={0} data-test-id={TestId.NAV}>
                                <Breadcrumbs
                                    onBreadcrumbClick={(_, isActive) => !isActive && onClose()}
                                    px={5}
                                    mb={3}
                                />
                                <RecipeMenu mb={3} />
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

export const HamburgerMenuOverlay = ({ isOpen, ...rest }: { isOpen?: boolean } & BoxProps) => (
    <Portal>
        <Box
            inset={0}
            pos='fixed'
            opacity={isOpen ? 1 : 0}
            zIndex='docked'
            pointerEvents='none'
            bg='blackAlpha.300'
            backdropFilter='auto'
            backdropBlur='2px'
            transitionProperty='opacity'
            transitionDuration='fast'
            {...rest}
        />
    </Portal>
);

export const HamburgerMenuButton = (props: { isOpen?: boolean } & MenuButtonProps) => (
    <MenuButton
        as={HamburgerMenuIcon}
        data-test-id={props.isOpen ? 'close-icon' : 'hamburger-icon'}
        {...props}
    />
);

const HamburgerMenuIcon = forwardRef<{ isOpen: boolean } & IconButtonProps, 'button'>(
    ({ isOpen, ...rest }, ref) => (
        <IconButton
            ref={ref}
            display='flex'
            variant='unstyled'
            boxSize={6}
            ml={4}
            icon={isOpen ? <CloseIcon boxSize={3} /> : <HamburgerIcon />}
            {...rest}
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        />
    ),
);
