import { Button, ButtonProps } from '@components/button';
import cn from 'classnames';

import styles from './card-nav-button.module.less';

export const CardNavButton = ({ className, ...props }: ButtonProps) => (
    <Button className={cn(styles.CardNavBtn, className)} {...props} />
);
