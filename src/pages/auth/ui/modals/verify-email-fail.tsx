import { Box, Heading, ModalBody, ModalCloseButton, ModalContent, Text } from '@chakra-ui/react';

import { Link } from '~/shared/ui/link';

export const VerifyEmailFailModalContent = () => (
    <ModalContent maxW={{ base: '316px', lg: '396px' }}>
        <ModalCloseButton size='sm' border='1px' borderRadius='full' top={6} right={6} />
        <ModalBody p={8} textAlign='center'>
            <Box
                mx='auto'
                bgImage='/images/verify-email-error.jpg'
                bgRepeat='no-repeat'
                bgSize='cover'
                boxSize={{ base: '108px', lg: '206px' }}
                mb={8}
            />
            <Heading fontSize='2xl' mb={4}>
                Упс! Что-то пошло не так
            </Heading>
            <Text color='blackAlpha.900' mb={8}>
                Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.
            </Text>
            <Text color='blackAlpha.600' fontSize='xs'>
                Остались вопросы? Свяжитесь{' '}
                <Link to='/' textDecoration='underline'>
                    с поддержкой.
                </Link>
            </Text>
        </ModalBody>
    </ModalContent>
);
