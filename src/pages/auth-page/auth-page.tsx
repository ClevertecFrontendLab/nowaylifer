import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { useState } from 'react';
import cn from 'classnames';
import { useAppLocation } from '@hooks/use-app-location';
import { Card } from '@components/card';
import { Logo } from '@components/logo';
import { Path } from '@router/paths';
import { RegisterForm } from './register-form';
import { LoginForm } from './login-form';
import { LoaderModal } from './loader-modal';
import styles from './auth-page.module.less';
import { AuthLoaderContext } from './use-auth-loader';

export type AuthTab = (typeof AuthTab)[keyof typeof AuthTab];
export const AuthTab = {
    Login: 'login',
    Register: 'register',
} as const;

const tabItems = [
    { label: 'Вход', key: AuthTab.Login, children: <LoginForm /> },
    { label: 'Регистрация', key: AuthTab.Register, children: <RegisterForm /> },
];

export const AuthPage = ({ tab = 'login' }: { tab?: AuthTab }) => {
    const navigate = useNavigate();
    const location = useAppLocation();
    const [loading, setLoading] = useState(false);
    const from = location.state?.from;

    const handleTabChange = (key: string) =>
        navigate(key === AuthTab.Register ? Path.Register : Path.Login, {
            replace: true,
            ...(from && { state: { from } }),
        });

    return (
        <AuthLoaderContext.Provider value={setLoading}>
            {loading && <LoaderModal />}
            <Card className={cn(styles.Card, loading && styles.Blur)}>
                <Logo className={styles.Logo} />
                <Tabs
                    className={styles.Tabs}
                    items={tabItems}
                    activeKey={tab}
                    onChange={handleTabChange}
                />
            </Card>
        </AuthLoaderContext.Provider>
    );
};
