import { Box, Heading, ModalBody, ModalCloseButton, ModalContent, Text } from '@chakra-ui/react';

import { Link } from '~/shared/ui/link';

export const VerifyEmailModalContent = ({ email }: { email: string }) => (
    <ModalContent maxW={{ base: '316px', lg: '396px' }}>
        <ModalCloseButton size='sm' border='1px' borderRadius='full' top={6} right={6} />
        <ModalBody p={8} textAlign='center'>
            <Box
                mx='auto'
                bgImage='/images/verify-email.png'
                bgRepeat='no-repeat'
                bgSize='cover'
                boxSize={{ base: '108px', lg: '206px' }}
                mb={8}
            />
            <Heading fontSize='2xl' mb={4}>
                Остался последний шаг. Нужно верифицировать ваш e-mail
            </Heading>
            <Text color='blackAlpha.900' mb={8}>
                Мы отправили вам на почту <b>{email}</b> ссылку для верификации.
            </Text>
            <Text color='blackAlpha.600' fontSize='xs'>
                Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь{' '}
                <Link to='/' textDecoration='underline'>
                    с поддержкой.
                </Link>
            </Text>
        </ModalBody>
    </ModalContent>
);
