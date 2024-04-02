import { ReactNode, useRef } from 'react';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Drawer } from '@components/drawer';
import { ExerciseFormsMenu, ExerciseFormsMenuHandle } from '@components/exercise-forms-menu';
import { TrainingType } from '@redux/catalogs';
import { Exercise } from '@redux/training';
import { DrawerProps } from 'antd';

import { useTraining } from '../training-provider';
import { TrainingTypeBadge } from '../training-type-badge';

import styles from './exercise-drawer.module.less';

export type ExerciseDrawerMode = 'create' | 'edit' | 'read';

const titleByMode: Record<ExerciseDrawerMode, { title: ReactNode; titleIcon?: ReactNode }> = {
    create: { title: 'Добавление упражнений', titleIcon: <PlusOutlined /> },
    edit: { title: 'Редактирование', titleIcon: <EditOutlined /> },
    read: { title: 'Просмотр упражнений' },
};

export type ExerciseDrawerProps = Omit<DrawerProps, 'onClose'> & {
    mode: ExerciseDrawerMode;
    trainingType: TrainingType;
    initialExercises?: Exercise[];
    onClose?(exercises: Exercise[]): void;
};

export const ExerciseDrawer = ({
    mode,
    initialExercises,
    trainingType,
    onClose,
    ...props
}: ExerciseDrawerProps) => {
    const exerciseMenuRef = useRef<ExerciseFormsMenuHandle>(null);
    const { date } = useTraining();

    const handleClose = () =>
        exerciseMenuRef.current &&
        onClose?.(mode === 'read' ? [] : exerciseMenuRef.current.getValidExercises());

    return (
        <Drawer
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
            data-test-id='modal-drawer-right'
            onClose={handleClose}
            {...titleByMode[mode]}
            {...props}
        >
            <div className={styles.Extra}>
                <TrainingTypeBadge trainingType={trainingType} />
                <time dateTime={date.local().format()}>{date.local().format('DD.MM.YYYY')}</time>
            </div>
            <ExerciseFormsMenu
                ref={exerciseMenuRef}
                initialExercises={initialExercises}
                mode={mode}
            />
        </Drawer>
    );
};
