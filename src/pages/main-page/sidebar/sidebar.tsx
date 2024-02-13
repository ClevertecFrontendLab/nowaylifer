import { CalendarTwoTone, HeartFilled, TrophyFilled, IdcardOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import ExitSvg from '@assets/icons/exit.svg?react';
import { useXs } from '@hooks/use-breakpoint';
import { Logo } from '@components/logo';
import { Switch } from './switch';
import styles from './sidebar.module.less';

const { Sider } = Layout;

const menuItems = [
    {
        label: 'Календарь',
        icon: <CalendarTwoTone twoToneColor={['currentColor', 'currentColor']} />,
    },
    {
        label: 'Тренировки',
        icon: <HeartFilled />,
    },
    {
        label: 'Достижения',
        icon: <TrophyFilled />,
    },
    {
        label: 'Профиль',
        icon: <IdcardOutlined />,
    },
];

export const Sidebar = () => {
    const xs = useXs();
    const [collapsed, setCollapsed] = useState(xs);

    return (
        <Sider
            width={xs ? 106 : 208}
            collapsible
            collapsedWidth={xs ? 0 : 64}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            className={styles.Sidebar}
            trigger={null}
        >
            <Switch
                collapsed={collapsed}
                onCollapse={setCollapsed}
                data-test-id={xs ? 'sider-switch-mobile' : 'sider-switch'}
            />
            <div className={styles.Wrapper}>
                <Logo
                    className={styles.Logo}
                    type={xs ? 'normal' : collapsed ? 'short' : 'normal'}
                    style={{ width: xs ? 72 : collapsed ? 28.55 : 133 }}
                />
                <Menu
                    className={styles.Menu}
                    mode='inline'
                    inlineIndent={xs ? 8 : 16}
                    items={menuItems.map((item, idx) => ({
                        ...item,
                        key: idx,
                        icon: xs ? undefined : item.icon,
                    }))}
                />
                <Menu
                    className={styles.Exit}
                    mode='inline'
                    inlineIndent={xs ? 8 : 16}
                    selectable={false}
                    items={[
                        {
                            key: 1,
                            label: 'Выйти',
                            icon: xs ? undefined : (
                                <ExitSvg
                                    style={
                                        collapsed ? { position: 'relative', right: 8 } : undefined
                                    }
                                />
                            ),
                        },
                    ]}
                />
            </div>
        </Sider>
    );
};
