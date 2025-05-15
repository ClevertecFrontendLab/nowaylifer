import { BoxProps, Flex } from '@chakra-ui/react';

export const Main = (props: BoxProps) => (
    <Flex h='full' direction='column' as='main' py={{ base: 4, lg: 8 }} {...props} />
);
