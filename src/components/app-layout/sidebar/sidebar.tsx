import { useEffect, useState } from 'react';
import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import ExitSvg from '@assets/icons/exit.svg?react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useXs } from '@hooks/use-breakpoint';
import { LoadCalendarPage } from '@pages/calendar-page';
import { LoadWorkoutsPage } from '@pages/workouts-page/load-workouts-page';
import { logout } from '@redux/auth/actions';
import { history } from '@redux/configure-store';
import { RoutePath } from '@router/paths';
import { Layout, Menu } from 'antd';
import { MenuItemType } from 'antd/lib/menu/hooks/useItems';

import styles from './sidebar.module.less';
import { SidebarLogo } from './sidebar-logo';
import { Switch } from './switch';

const { Sider } = Layout;

let loadCalendarPage: () => void;
let preloadCalendarPage: () => void;
let loadWorkoutsPage: () => void;

const menuItems: MenuItemType[] = [
    {
        key: 'calendar',
        label: (
            <LoadCalendarPage
                render={(load, preload) => {
                    loadCalendarPage = load;
                    preloadCalendarPage = preload;

                    return 'Календарь';
                }}
            />
        ),
        icon: <CalendarTwoTone twoToneColor={['currentColor', 'currentColor']} />,
        onClick: () => loadCalendarPage?.(),
        onMouseEnter: () => preloadCalendarPage?.(),
    },
    {
        key: 'trainings',
        label: (
            <LoadWorkoutsPage
                render={(load) => {
                    loadWorkoutsPage = load;

                    return 'Тренировки';
                }}
            />
        ),
        icon: <HeartFilled />,
        onClick: () => loadWorkoutsPage?.(),
    },
    {
        key: 'achievements',
        label: 'Достижения',
        icon: <TrophyFilled />,
    },
    {
        key: 'profile',
        label: 'Профиль',
        icon: <IdcardOutlined />,
        onClick: () => history.push(RoutePath.Profile),
    },
];

export const Sidebar = () => {
    const xs = useXs();
    const [collapsed, setCollapsed] = useState(xs);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (xs) setCollapsed(true);
    }, [xs]);

    return (
        <Sider
            className={styles.Sidebar}
            collapsed={collapsed}
            collapsedWidth={xs ? 0 : 64}
            collapsible={true}
            onCollapse={setCollapsed}
            trigger={null}
            width={xs ? 106 : 208}
        >
            <Switch
                collapsed={collapsed}
                data-test-id={xs ? 'sider-switch-mobile' : 'sider-switch'}
                onCollapse={setCollapsed}
            />
            <div className={styles.Wrapper}>
                <SidebarLogo collapsed={collapsed} />
                <Menu
                    className={styles.Menu}
                    inlineIndent={xs ? 8 : 16}
                    items={menuItems.map((item, idx) => ({
                        ...item,
                        key: idx,
                        icon: xs ? undefined : item.icon,
                    }))}
                    mode='inline'
                />
                <Menu
                    className={styles.Exit}
                    inlineIndent={xs ? 8 : 16}
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
                    mode='inline'
                    onClick={handleLogout}
                    selectable={false}
                />
            </div>
        </Sider>
    );
};
