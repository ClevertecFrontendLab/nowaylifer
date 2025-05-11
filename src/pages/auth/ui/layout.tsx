import { Box, BoxProps, Center, Flex, TabPanel, TabPanels, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { useModal } from '~/shared/infra/modals-provider';
import { toast } from '~/shared/infra/toast';
import { RoutePath } from '~/shared/router';
import { Logo } from '~/shared/ui/logo';
import { Tab, TabList, Tabs } from '~/shared/ui/tabs';

import { emailVerificationHistoryState } from '../email-verificaton/email-verification-history-state';
import { VerifyEmailFailModalContent } from './modals/verify-email-fail';

const tabs = [
    { label: 'Вход на сайт', path: RoutePath.Login },
    { label: 'Регистрация', path: RoutePath.Signup },
];

export const AuthLayout = () => {
    const navigate = useNavigate();
    const { openModal } = useModal();

    useEffect(() => {
        const isEmailVerified = emailVerificationHistoryState.getState();
        if (isEmailVerified == null) return;

        if (isEmailVerified) {
            toast({ status: 'success', title: 'Верификация прошла успешно' });
        } else {
            openModal({ content: <VerifyEmailFailModalContent /> });
        }

        emailVerificationHistoryState.clearState();
    }, [openModal]);

    return (
        <Flex minH='100dvh'>
            <Box flex={1} bgGradient='linear(208deg, lime.100, #29813f)'>
                <Center pt='170px' mb='80px'>
                    <Logo h={16} w='auto' />
                </Center>
                <Tabs
                    size='lg'
                    index={tabs.findIndex((tab) => location.pathname.startsWith(tab.path))}
                    onChange={(idx) => navigate(tabs[idx].path)}
                >
                    <TabList>
                        {tabs.map((tab) => (
                            <Tab key={tab.path}>{tab.label}</Tab>
                        ))}
                    </TabList>
                    <TabPanels px={{ base: 4, lg: 8 }}>
                        {tabs.map((tab) => (
                            <TabPanel key={tab.path} maxW='461px' mx='auto'>
                                <Outlet />
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Box>
            <Hero flex={1} hideBelow='lg' />
        </Flex>
    );
};

const Hero = (props: BoxProps) => (
    <Box
        pos='relative'
        bgSize='cover'
        bgPos='bottom 25% right'
        bgRepeat='no-repeat'
        backgroundImage='/images/auth-hero.png'
        {...props}
    >
        <Text pos='absolute' bottom={7.5} right={7.5} fontWeight='semibold' fontSize='xs'>
            &ndash; Лучший сервис для ваших кулинарных побед
        </Text>
    </Box>
);
