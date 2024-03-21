import type { ComponentProps } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import styles from './switch.module.less';

type SwitcherProps = {
    collapsed: boolean;
    onCollapse: (value: boolean) => void;
} & Omit<ComponentProps<'button'>, 'onClick'>;

export const Switch = ({ collapsed, onCollapse, className = '', ...props }: SwitcherProps) => (
    <button
        className={`${styles.Switch} ${className}`}
        onClick={() => onCollapse(!collapsed)}
        type='button'
        {...props}
    >
        <div className={styles.SwitchPolygon}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
    </button>
);
