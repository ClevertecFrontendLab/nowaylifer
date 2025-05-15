import {
    Box,
    BoxProps,
    Center,
    Flex,
    Spacer,
    TabPanel,
    TabPanels,
    Text,
    useMergeRefs,
} from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router';

import { useToastErrorLogger } from '~/shared/infra/error-logger';
import { selectIsModalOpen } from '~/shared/infra/modals-manager';
import { useToast } from '~/shared/infra/toast';
import { RoutePath } from '~/shared/router';
import { useAppSelector } from '~/shared/store';
import { Logo } from '~/shared/ui/logo';
import { Tab, TabList, Tabs } from '~/shared/ui/tabs';

import imageUrl from './assets/hero.jpg';
import { AuthToastProvider } from './context';
import { EmailVerificationResultHandler } from './email-verificaton';

const tabs = [
    { label: 'Вход на сайт', path: RoutePath.Login },
    { label: 'Регистрация', path: RoutePath.Signup },
];

export const AuthLayout = () => {
    const isModalOpen = useAppSelector(selectIsModalOpen);
    const navigate = useNavigate();

    const { anchorRef: errorAnchorRef } = useToastErrorLogger();
    const { anchorRef, toast } = useToast({ isAnchored: !isModalOpen });

    return (
        <AuthToastProvider value={toast}>
            <EmailVerificationResultHandler />
            <Flex minH='100dvh' bgGradient='linear(237deg, lime.100 30.27%, #29813F 136.1%)'>
                <Flex
                    ref={useMergeRefs(anchorRef, isModalOpen ? undefined : errorAnchorRef)}
                    pt={{ base: '72px', md: '140px', lg: '170px' }}
                    pb={{ base: 4, md: 5 }}
                    direction='column'
                    flex={1}
                >
                    <Center mb={{ base: 10, md: 14, lg: 20 }}>
                        <Logo h={{ base: 9.5, lg: 16 }} w='auto' />
                    </Center>
                    <Box px={{ base: 4, lg: 8 }}>
                        <Tabs
                            isLazy
                            w='full'
                            maxW={{ base: '355px', lg: '451px', '2xl': '461px' }}
                            mx='auto'
                            size={{ base: 'md', lg: 'lg' }}
                            index={tabs.findIndex((tab) => location.pathname.startsWith(tab.path))}
                            onChange={(idx) => navigate(tabs[idx].path)}
                        >
                            <TabList>
                                {tabs.map((tab) => (
                                    <Tab
                                        key={tab.path}
                                        _selected={{ '--tabs-color': 'colors.lime.700' }}
                                        _active={{ '--tabs-bg': 'colors.blackAlpha.50' }}
                                        flex={1}
                                    >
                                        {tab.label}
                                    </Tab>
                                ))}
                            </TabList>
                            <TabPanels mt={9}>
                                {tabs.map((tab) => (
                                    <TabPanel key={tab.path}>
                                        <Outlet />
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </Tabs>
                    </Box>
                    <Spacer />
                    <Text fontSize='xs' fontWeight='semibold' p={2.5} mx={{ base: 4, md: 5 }}>
                        Все права защищены, ученический файл, @Клевер Технолоджи, 2025
                    </Text>
                </Flex>
                <Hero flex={1} hideBelow='lg' />
            </Flex>
        </AuthToastProvider>
    );
};

const Hero = (props: BoxProps & { ref?: React.Ref<HTMLDivElement> }) => (
    <Box
        pos='relative'
        bgSize='cover'
        bgPos='bottom 25% right'
        bgRepeat='no-repeat'
        backgroundImage={imageUrl}
        {...props}
    >
        <Text pos='absolute' bottom={7.5} right={7.5} fontWeight='semibold' fontSize='xs'>
            &ndash; Лучший сервис для ваших кулинарных побед
        </Text>
    </Box>
);
