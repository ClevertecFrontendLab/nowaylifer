import {
    Box,
    BoxProps,
    chakra,
    Heading,
    HeadingProps,
    ModalBody,
    ModalCloseButton,
    ModalCloseButtonProps,
    ModalContent,
    Text,
} from '@chakra-ui/react';

export const AuthModalContent = chakra(ModalContent, {
    baseStyle: { maxW: { base: '316px', lg: '396px' }, borderRadius: '2xl' },
});

export const AuthModalBody = chakra(ModalBody, { baseStyle: { p: 8, textAlign: 'center' } });

export const AuthModalTitle = (props: HeadingProps) => (
    <Heading fontSize='2xl' mb={4} lineHeight={8} {...props} />
);

export const AuthModalDescription = chakra(Text, { baseStyle: { color: 'blackAlpha.900', mb: 8 } });

export const AuthModalSmallPrint = chakra(Text, {
    baseStyle: { fontSize: 'xs', color: 'blackAlpha.600', lineHeight: 4 },
});

export const AuthModalImage = ({ src, ...props }: BoxProps & { src: string }) => (
    <Box
        mx='auto'
        bgImage={src}
        bgRepeat='no-repeat'
        bgSize='cover'
        boxSize={{ base: '108px', lg: '206px' }}
        aria-hidden
        mb={8}
        {...props}
    />
);

export const AuthModalCloseButton = (props: ModalCloseButtonProps) => (
    <ModalCloseButton size='sm' border='1px' borderRadius='full' top={6} right={6} {...props} />
);
