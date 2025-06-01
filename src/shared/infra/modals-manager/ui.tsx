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

export const AppModalContent = chakra(ModalContent, {
    baseStyle: { maxW: { base: '316px', lg: '396px' }, borderRadius: '2xl' },
});

export const AppModalBody = chakra(ModalBody, { baseStyle: { p: 8, textAlign: 'center' } });

export const AppModalTitle = (props: HeadingProps) => (
    <Heading fontSize='2xl' mb={4} lineHeight={8} {...props} />
);

export const AppModalDescription = chakra(Text, { baseStyle: { color: 'blackAlpha.900', mb: 8 } });

export const AppModalSmallPrint = chakra(Text, {
    baseStyle: { fontSize: 'xs', color: 'blackAlpha.600', lineHeight: 4 },
});

export const AppModalImage = ({ src, ...props }: BoxProps & { src: string }) => (
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

export const AppModalCloseButton = (props: ModalCloseButtonProps) => (
    <ModalCloseButton size='sm' border='1px' borderRadius='full' top={6} right={6} {...props} />
);
