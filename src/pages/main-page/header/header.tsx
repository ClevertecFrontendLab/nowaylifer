import { Breadcrumbs } from '@components/breadcrumbs';
import { PageHeader } from '@components/page-header';
import { Typography } from 'antd';

import styles from './header.module.less';
import { SettingsButton } from './settings-button';

export const Header = () => (
    <PageHeader>
        <Breadcrumbs className={styles.Breadcrumb} />
        <div className={styles.TitleWrap}>
            <Typography.Title className={styles.Title}>
                Приветствуем тебя в CleverFit — приложении,
                <br /> которое поможет тебе добиться своей мечты!
            </Typography.Title>
            <SettingsButton />
        </div>
    </PageHeader>
);
