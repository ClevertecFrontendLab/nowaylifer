import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createExerciseDraft, Exercise } from '@redux/training';
import { FormInstance } from 'antd';

import { ExerciseFormsMenuControlsProps } from './exercise-forms-menu-controls/exercise-forms-menu-button';
import { ExerciseForm } from './exercise-form';
import styles from './exercise-forms-menu.module.less';
import { ExerciseMenuControls } from './exercise-forms-menu-controls';

type ExerciseFormRecord = Record<Exercise['_id'], FormInstance<Exercise>>;

export type ExerciseFormsMenuProps = Pick<
    ExerciseFormsMenuControlsProps,
    'addText' | 'deleteText' | 'addButtonProps' | 'deleteButtonProps'
> & {
    mode: 'create' | 'edit' | 'read';
    initialExercises?: Exercise[];
    // considered valid when there is a form with filled "name" field
    onValidChange?(valid: boolean): void;
    onMenuTouched?(): void;
};

export type ExerciseFormsMenuHandle = {
    getValidExercises(): Exercise[];
};

const defaultInitialExercises: Exercise[] = [];

export const ExerciseFormsMenu = forwardRef<ExerciseFormsMenuHandle, ExerciseFormsMenuProps>(
    (
        {
            mode,
            onMenuTouched,
            onValidChange,
            initialExercises = defaultInitialExercises,
            ...controlsProps
        },
        ref,
    ) => {
        const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
        const [selectedFormsIndexes, setSelectedFormsIndexes] = useState<number[]>([]);
        const exerciseFormMap = useRef<ExerciseFormRecord>({});
        const [isMenuTouched, setIsMenuTouched] = useState(false);

        const hasValidExercise = exercises.some((e) => !!e.name);

        useEffect(() => {
            if (isMenuTouched) onMenuTouched?.();
        }, [isMenuTouched, onMenuTouched]);

        useEffect(() => {
            onValidChange?.(hasValidExercise);
        }, [hasValidExercise, onValidChange]);

        const [prevExercises, setPrevExercises] = useState(initialExercises);

        if (prevExercises !== initialExercises) {
            setPrevExercises(initialExercises);
            setExercises(initialExercises);
        }

        useImperativeHandle(ref, () => ({
            getValidExercises: () =>
                Object.values(exerciseFormMap.current)
                    .map((form) => form.getFieldsValue())
                    .filter((exercise) => !!exercise.name),
        }));

        const handleSelectChange = (index: number, selected: boolean) => {
            setSelectedFormsIndexes((prev) =>
                selected ? [...prev, index] : prev.filter((idx) => idx !== index),
            );
        };

        const handleAdd = () => setExercises((prev) => [...prev, createExerciseDraft()]);

        const handleDelete = () => {
            setExercises((prev) => prev.filter((_, idx) => !selectedFormsIndexes.includes(idx)));
            setSelectedFormsIndexes([]);
        };

        return (
            <div>
                <div className={styles.FormsWrap}>
                    {exercises.map((exercise, idx) => (
                        <ExerciseForm
                            key={exercise._id}
                            ref={(form) => {
                                if (form) exerciseFormMap.current[exercise._id] = form;
                                else delete exerciseFormMap.current[exercise._id];
                            }}
                            index={idx}
                            initialValues={exercise}
                            mode={mode}
                            onSelectChange={(selected) => handleSelectChange(idx, selected)}
                            onValuesChange={(_, values) => {
                                setIsMenuTouched(true);
                                setExercises((prev) =>
                                    prev.map((e) => (e._id === values._id ? values : e)),
                                );
                            }}
                            readOnly={mode === 'read'}
                        />
                    ))}
                </div>
                {mode !== 'read' && (
                    <ExerciseMenuControls
                        addButtonProps={controlsProps.addButtonProps}
                        addText={controlsProps.addText}
                        deleteButtonProps={{
                            disabled: !selectedFormsIndexes.length,
                            ...controlsProps.deleteButtonProps,
                        }}
                        deleteText={controlsProps.deleteText}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        showDeleteButton={mode === 'edit'}
                    />
                )}
            </div>
        );
    },
);
ExerciseFormsMenu.displayName = 'ExerciseMenu';
