import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { Logo } from '@components/logo';
import { Path } from '@router/paths';
import { RegisterForm } from '../register-form';
import { LoginForm } from '../login-form';
import { AuthCard } from '../auth-card';
import styles from './auth-form.module.less';

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
        navigate(key === AuthTab.Register ? Path.Register : Path.Login, { replace: true });

    return (
        <AuthCard>
            <Logo className={styles.Logo} />
            <Tabs
                className={styles.Tabs}
                items={tabItems}
                activeKey={type}
                onChange={handleTabChange}
            />
        </AuthCard>
    );
};
