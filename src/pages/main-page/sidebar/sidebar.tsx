import { Layout, Menu } from 'antd';
import styles from './sidebar.module.css';

const { Sider } = Layout;

export const Sidebar = () => {
    return (
        <Sider className={styles.Sidebar}>
            <Menu></Menu>
        </Sider>
    );
};
