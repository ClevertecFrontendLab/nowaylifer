import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import ExitSvg from '@assets/icons/exit.svg?react';
import { Logo } from '@components/logo';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useXs } from '@hooks/use-breakpoint';
import { logout } from '@redux/auth/actions';
import { Path } from '@router/paths';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.less';
import { Switch } from './switch';
import { LoadCalendarPage } from '@pages/calendar-page';

const { Sider } = Layout;

const menuItems = [
    {
        label: <LoadCalendarPage render={(load) => <div onClick={load}>Календарь</div>} />,
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
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

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
                <Link to={Path.Main}>
                    <Logo
                        className={styles.Logo}
                        type={xs ? 'normal' : collapsed ? 'short' : 'normal'}
                        style={{ width: xs ? 72 : collapsed ? 28.55 : 133 }}
                    />
                </Link>
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
                    onClick={handleLogout}
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
