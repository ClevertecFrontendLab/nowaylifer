import { Layout, Typography, Breadcrumb } from 'antd';
import { SettingsButton } from './settings-button';
import styles from './header.module.less';

export const Header = () => (
    <Layout.Header className={styles.Header}>
        <Breadcrumb className={styles.Breadcrumb}>
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.TitleWrap}>
            <Typography.Title className={styles.Title}>
                Приветствуем тебя в CleverFit — приложении,
                <br /> которое поможет тебе добиться своей мечты!
            </Typography.Title>
            <SettingsButton />
        </div>
    </Layout.Header>
);
