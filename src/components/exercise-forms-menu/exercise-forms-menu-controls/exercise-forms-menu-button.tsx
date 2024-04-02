import { CSSProperties, ReactNode } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from '@components/button';
import cn from 'classnames';

import styles from './exercise-forms-menu-controls.module.less';

export type ExerciseFormsMenuControlsProps = {
    addText?: ReactNode;
    deleteText?: ReactNode;
    style?: CSSProperties;
    className?: string;
    showDeleteButton?: boolean;
    addButtonProps?: ButtonProps;
    deleteButtonProps?: ButtonProps;
    onDelete?(): void;
    onAdd?(): void;
};

export const ExerciseFormsMenuControls = ({
    style,
    className,
    onAdd,
    onDelete,
    addText = 'Добавить ещё',
    deleteText = 'Удалить',
    addButtonProps,
    deleteButtonProps,
    showDeleteButton = false,
}: ExerciseFormsMenuControlsProps) => (
    <div className={cn(styles.Container, className)} style={style}>
        <Button
            block={true}
            className={cn(styles.Button, styles.AddButton)}
            icon={<PlusOutlined />}
            onClick={onAdd}
            size='large'
            {...addButtonProps}
        >
            {addText}
        </Button>
        {showDeleteButton && (
            <Button
                block={true}
                className={styles.Button}
                icon={<MinusOutlined />}
                onClick={onDelete}
                size='large'
                {...deleteButtonProps}
            >
                {deleteText}
            </Button>
        )}
    </div>
);
