import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from './switch.module.less';

type SwitcherProps = {
    collapsed: boolean;
    onCollapse: (value: boolean) => void;
};

export const Switch = ({ collapsed, onCollapse }: SwitcherProps) => {
    return (
        <button className={styles.Switch} onClick={() => onCollapse(!collapsed)}>
            <div className={styles.SwitchPolygon}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
        </button>
    );
};
