import { Box, BoxProps, Text } from '@chakra-ui/react';

export const About = (props: BoxProps) => (
    <Box {...props}>
        <Text color='blackAlpha.400' fontSize='xs' lineHeight={4} fontWeight='medium' mb={4}>
            Версия программы 03.25
        </Text>
        <Text color='blackAlpha.700' fontSize='xs' lineHeight={4} mb={4}>
            Все права защищены, ученический файл,
            <br />
            ©Клевер Технолоджи, 2025
        </Text>
    </Box>
);
