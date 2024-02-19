import { useNavigate } from 'react-router-dom';
import { Layout, Tabs, TabsProps } from 'antd';
import { useAppLocation } from '@hooks/use-app-location';
import { Card } from '@components/card';
import { Logo } from '@components/logo';
import { Path } from '@router/routes';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import styles from './auth-page.module.less';

export type AuthTab = (typeof AuthTab)[keyof typeof AuthTab];
export const AuthTab = {
    Login: 'login',
    Register: 'register',
} as const;

const tabItems: TabsProps['items'] = [
    { label: 'Вход', key: AuthTab.Login, children: <LoginForm /> },
    { label: 'Регистрация', key: AuthTab.Register, children: <RegisterForm /> },
];

export const AuthPage = ({ tab = 'login' }: { tab?: AuthTab }) => {
    const navigate = useNavigate();
    const location = useAppLocation();
    const from = location.state?.from;

    const handleTabChange = (key: string) =>
        navigate(key === AuthTab.Register ? Path.Register : Path.Auth, {
            replace: true,
            ...(from && { state: { from } }),
        });

    return (
        <Layout className={styles.Layout}>
            <Layout.Content className={styles.Content}>
                <Card className={styles.Card}>
                    <Logo className={styles.Logo} />
                    <Tabs
                        className={styles.Tabs}
                        items={tabItems}
                        activeKey={tab}
                        onChange={handleTabChange}
                    />
                </Card>
            </Layout.Content>
        </Layout>
    );
};
