import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router';

export interface LinkProps
    extends Omit<ReactRouterLinkProps, keyof ChakraLinkProps>,
        ChakraLinkProps {}

export const Link = (props: LinkProps) => <ChakraLink as={ReactRouterLink} {...props} />;
