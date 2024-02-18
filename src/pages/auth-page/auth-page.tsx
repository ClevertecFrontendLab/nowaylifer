import { Layout, Tabs } from 'antd';
import styles from './auth-page.module.less';
import { Card } from '@components/card';
import { Logo } from '@components/logo';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

const tabItems = [
    { label: 'Вход', key: 'login', children: <LoginForm /> },
    { label: 'Регистрация', key: 'register', children: <RegisterForm /> },
];

export const AuthPage = () => {
    return (
        <Layout className={styles.Layout}>
            <Layout.Content className={styles.Content}>
                <Card className={styles.Card}>
                    <Logo className={styles.Logo} />
                    <Tabs className={styles.Tabs} items={tabItems} />
                </Card>
            </Layout.Content>
        </Layout>
    );
};
