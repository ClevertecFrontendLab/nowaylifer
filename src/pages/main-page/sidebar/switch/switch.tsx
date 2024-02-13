import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import type { ComponentProps } from 'react';
import styles from './switch.module.less';

type SwitcherProps = {
    collapsed: boolean;
    onCollapse: (value: boolean) => void;
} & Omit<ComponentProps<'button'>, 'onClick'>;

export const Switch = ({ collapsed, onCollapse, className = '', ...props }: SwitcherProps) => (
    <button
        className={`${styles.Switch} ${className}`}
        onClick={() => onCollapse(!collapsed)}
        {...props}
    >
        <div className={styles.SwitchPolygon}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
    </button>
);
