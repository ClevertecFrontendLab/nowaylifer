import { Button as ButtonAntd, ButtonProps } from 'antd';
import cn from 'classnames';

import styles from './button.module.less';

export const Button = ({ className, ...props }: ButtonProps) => (
    <ButtonAntd className={cn(styles.Button, className)} {...props} />
);
