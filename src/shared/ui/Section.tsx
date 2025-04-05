import { Box, BoxProps, Heading, HeadingProps } from '@chakra-ui/react';

export const SectionHeading = (props: HeadingProps) => (
    <Heading fontWeight='medium' fontSize={{ base: '2xl', lg: '4xl', '2xl': '5xl' }} {...props} />
);

export const Section = (props: BoxProps) => (
    <Box
        as='section'
        px={{ base: 4, md: 5, lg: 6 }}
        _notLast={{ mb: { base: 8, lg: 10 } }}
        {...props}
    />
);
