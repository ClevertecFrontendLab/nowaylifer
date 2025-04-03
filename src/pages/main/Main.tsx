import { Box, Flex } from '@chakra-ui/react';

import { SearchBar } from '~/widgets/SearchBar';

export default function MainPage() {
    return (
        <Flex justify='center' pt={8}>
            <Box w='full' maxW='518px'>
                <SearchBar />
            </Box>
        </Flex>
    );
}
