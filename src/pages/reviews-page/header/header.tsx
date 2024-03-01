import { Breadcrumb, Layout } from 'antd';

export const Header = () => (
    <Layout.Header>
        <Breadcrumb>
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
            <Breadcrumb.Item>Отзывы пользователей</Breadcrumb.Item>
        </Breadcrumb>
    </Layout.Header>
);
