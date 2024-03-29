import { forwardRef, useImperativeHandle } from 'react';
import { Exercise } from '@redux/training';
import { Checkbox, Col, Form, FormInstance, FormProps, Input, InputNumber, Row } from 'antd';
import cn from 'classnames';

import { ExerciseDrawerMode } from '../exercise-drawer';

import styles from './exercise-form.module.less';

export type ExerciseFormValues = Omit<Exercise, 'isImplementation'>;

export type ExerciseFormProps = Omit<FormProps, 'form'> & {
    index?: number;
    readOnly?: boolean;
    mode: ExerciseDrawerMode;
    onSelectChange?(selected: boolean): void;
};

export const ExerciseForm = forwardRef<FormInstance<ExerciseFormValues>, ExerciseFormProps>(
    ({ className, readOnly, index, mode, onSelectChange, initialValues, ...props }, ref) => {
        const [form] = Form.useForm<ExerciseFormValues>();

        useImperativeHandle(ref, () => form);

        return (
            <Form
                className={cn(styles.Form, className)}
                form={form}
                initialValues={initialValues}
                layout='vertical'
                {...props}
            >
                <Form.Item name='_id' noStyle={true}>
                    <Input hidden={true} />
                </Form.Item>
                <Form.Item name='name' style={{ marginBottom: 7 }}>
                    <Input
                        addonAfter={
                            mode === 'edit' ? (
                                <Checkbox
                                    data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                    onChange={(e) => onSelectChange?.(e.target.checked)}
                                />
                            ) : null
                        }
                        data-test-id={`modal-drawer-right-input-exercise${index}`}
                        placeholder='Упражнение'
                        readOnly={readOnly}
                        size='small'
                    />
                </Form.Item>
                <Row justify='space-between'>
                    <Col style={{ maxWidth: 120 }}>
                        <Form.Item label='Повторы' name='approaches'>
                            <InputNumber
                                addonBefore='+'
                                data-test-id={`modal-drawer-right-input-approach${index}`}
                                min={1}
                                placeholder='1'
                                readOnly={readOnly}
                                size='small'
                            />
                        </Form.Item>
                    </Col>
                    <Row>
                        <Col style={{ maxWidth: 89 }}>
                            <Form.Item label='Вес, кг' name='weight'>
                                <InputNumber
                                    data-test-id={`modal-drawer-right-input-weight${index}`}
                                    min={0}
                                    placeholder='0'
                                    readOnly={readOnly}
                                    size='small'
                                />
                            </Form.Item>
                        </Col>
                        <Col className={styles.MultiplySign}>x</Col>
                        <Col style={{ maxWidth: 89 }}>
                            <Form.Item label='Количество' name='replays'>
                                <InputNumber
                                    data-test-id={`modal-drawer-right-input-quantity${index}`}
                                    min={1}
                                    placeholder='3'
                                    readOnly={readOnly}
                                    size='small'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Row>
            </Form>
        );
    },
);
ExerciseForm.displayName = 'ExerciseForm';
