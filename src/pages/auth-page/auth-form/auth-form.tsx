import { useNavigate } from 'react-router-dom';
import { Logo } from '@components/logo';
import { RoutePath } from '@router/paths';
import { Tabs } from 'antd';

import { AuthCard } from '../ui/auth-card';

import styles from './auth-form.module.less';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

export type AuthTab = (typeof AuthTab)[keyof typeof AuthTab];
export const AuthTab = {
    Login: 'login',
    Register: 'register',
} as const;

const tabItems = [
    { label: 'Вход', key: AuthTab.Login, children: <LoginForm /> },
    { label: 'Регистрация', key: AuthTab.Register, children: <RegisterForm /> },
];

export const AuthForm = ({ type = 'login' }: { type?: AuthTab }) => {
    const navigate = useNavigate();

    const handleTabChange = (key: string) =>
        navigate(key === AuthTab.Register ? RoutePath.Register : RoutePath.Login, {
            replace: true,
        });

    return (
        <AuthCard>
            <Logo className={styles.Logo} />
            <Tabs
                activeKey={type}
                className={styles.Tabs}
                items={tabItems}
                onChange={handleTabChange}
            />
        </AuthCard>
    );
};
