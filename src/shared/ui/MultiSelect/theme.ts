import { createMultiStyleConfigHelpers, cssVar, defineStyle, theme } from '@chakra-ui/react';
import { transparentize } from '@chakra-ui/theme-tools';

import { multiSelectAnatomy } from './anatomy';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(
    multiSelectAnatomy.keys,
);

const selectTheme = theme.components.Select;
const inputTheme = theme.components.Input;
const $height = cssVar('input-height');
const $bg = cssVar('select-bg');
const $menuBg = cssVar('select-menu-bg');
const $menuShadow = cssVar('select-menu-shadow');

const baseStyleContainer = defineStyle({
    _disabled: {
        ...inputTheme.baseStyle?.field._disabled,
        pointerEvents: 'none',
    },
    [$bg.variable]: 'colors.white',
    _dark: {
        [$bg.variable]: 'colors.gray.700',
    },
    h: 'auto',
    w: 'full',
    minW: 0,
    minH: $height.reference,
    pos: 'relative',
    alignItems: 'center',
    display: 'flex',
});

const baseStyleField = defineStyle({
    ...inputTheme.baseStyle?.field,
    bg: $bg.reference,
    lineHeight: 'normal',
    h: 'full',
    pos: 'absolute',
    inset: 0,
    pr: 10,
    textAlign: 'start',
    _disabled: {
        pointerEvents: 'none',
    },
});

const baseStyleTagList = defineStyle({
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    pl: 4,
    py: 2.5,
    alignItems: 'center',
    gap: 1,
    rowGap: 1,
    columnGap: 2,
    minH: $height.reference,
});

const baseStyleMenu = defineStyle({
    [$menuBg.variable]: 'colors.white',
    [$menuShadow.variable]: 'shadows.sm',
    _dark: {
        [$menuBg.variable]: 'colors.gray.700',
        [$menuShadow.variable]: 'shadows.dark-lg',
    },
    boxShadow: $menuShadow.reference,
    bg: $menuBg.reference,
    zIndex: 1,
    borderRadius: 'md',
    borderWidth: '1px',
    py: 2,
});

const baseStyleMenuList = defineStyle({
    listStyle: 'none',
    overflow: 'auto',
    m: 0,
});

const baseStyleItem = defineStyle(({ colorScheme: c, theme }) => ({
    cursor: 'pointer',
    py: 1.5,
    px: 4,
    transitionProperty: 'background',
    transitionDuration: 'ultra-fast',
    transitionTimingFunction: 'ease-in',
    color: 'gray.800',
    _focus: {
        [$menuBg.variable]: 'colors.gray.100',
        _dark: {
            [$menuBg.variable]: 'colors.whiteAlpha.100',
        },
    },
    _active: {
        [$menuBg.variable]: 'colors.gray.200',
        _dark: {
            [$menuBg.variable]: 'colors.whiteAlpha.200',
        },
    },
    _selected: {
        _focus: {
            [$menuBg.variable]: `colors.${c}.400`,
        },
        [$menuBg.variable]: `colors.${c}.500`,
        _dark: {
            [$menuBg.variable]: transparentize(`${c}.400`, 0.6)(theme),
        },
        color: 'white',
    },
    bg: $menuBg.reference,
}));

const baseStyleClearButton = defineStyle({
    position: 'relative',
    color: 'gray.700',
});

const baseStyleIcon = defineStyle({
    ...selectTheme.baseStyle?.icon,
    pos: 'static',
    width: 'auto',
    mr: 3,
    display: 'inline-flex',
    alignItems: 'center',
    pointerEvents: 'none',
    color: 'gray.700',
});

const baseStyleTag = defineStyle({
    position: 'relative',
});

const baseStylePlaceholder = defineStyle({
    color: 'chakra-placeholder-color',
    isTruncated: true,
    userSelect: 'none',
});

const baseStyle = definePartsStyle((props) => ({
    container: baseStyleContainer,
    field: baseStyleField,
    placeholder: baseStylePlaceholder,
    tag: baseStyleTag,
    tagList: baseStyleTagList,
    clearButton: baseStyleClearButton,
    icon: baseStyleIcon,
    menu: baseStyleMenu,
    menuList: baseStyleMenuList,
    item: baseStyleItem(props),
}));

const sizes = {
    md: {
        container: {
            ...selectTheme.sizes?.md.field,
            p: 0,
        },
    },
};

const variantOutline = definePartsStyle((props) => {
    const defaultStyles = inputTheme.variants?.outline(props);
    return {
        field: {
            ...defaultStyles?.field,
            _focus: { ...defaultStyles?.field._focusVisible, zIndex: 'auto' },
        },
    };
});

const variants = {
    outline: variantOutline,
};

export const multiSelectTheme = defineMultiStyleConfig({
    baseStyle,
    sizes,
    variants,
    defaultProps: {
        variant: 'outline',
        colorScheme: 'blue',
        size: 'md',
    },
});
