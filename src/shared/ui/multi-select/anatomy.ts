import { anatomy } from '@chakra-ui/anatomy';
import { SystemStyleObject } from '@chakra-ui/react';

export const multiSelectAnatomy = anatomy('multiSelect').parts(
    'container',
    'field',
    'placeholder',
    'icon',
    'clearButton',
    'menu',
    'menuList',
    'menuFooter',
    'item',
    'tag',
    'tagList',
);

export const multiSelectClassNames = multiSelectAnatomy.classnames();

export type MultiSelectStyles = Record<typeof multiSelectAnatomy.__type, SystemStyleObject>;
