import { Exercise } from '@redux/training';
import { Checkbox, Col, Form, FormInstance, FormProps, Input, InputNumber, Row } from 'antd';
import cn from 'classnames';
import { forwardRef, useImperativeHandle } from 'react';
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
                form={form}
                layout='vertical'
                className={cn(styles.Form, className)}
                initialValues={initialValues}
                {...props}
            >
                <Form.Item name='_id' noStyle>
                    <Input hidden />
                </Form.Item>
                <Form.Item name='name' style={{ marginBottom: 7 }}>
                    <Input
                        size='small'
                        readOnly={readOnly}
                        placeholder='Упражнение'
                        addonAfter={
                            mode === 'edit' ? (
                                <Checkbox
                                    onChange={(e) => onSelectChange?.(e.target.checked)}
                                    data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                />
                            ) : null
                        }
                        data-test-id={`modal-drawer-right-input-exercise${index}`}
                    />
                </Form.Item>
                <Row justify='space-between'>
                    <Col style={{ maxWidth: 120 }}>
                        <Form.Item label='Повторы' name='approaches'>
                            <InputNumber
                                min={1}
                                size='small'
                                addonBefore='+'
                                placeholder='1'
                                readOnly={readOnly}
                                data-test-id={`modal-drawer-right-input-approach${index}`}
                            />
                        </Form.Item>
                    </Col>
                    <Row>
                        <Col style={{ maxWidth: 89 }}>
                            <Form.Item label='Вес, кг' name='weight'>
                                <InputNumber
                                    min={0}
                                    size='small'
                                    placeholder='0'
                                    readOnly={readOnly}
                                    data-test-id={`modal-drawer-right-input-weight${index}`}
                                />
                            </Form.Item>
                        </Col>
                        <Col className={styles.MultiplySign}>x</Col>
                        <Col style={{ maxWidth: 89 }}>
                            <Form.Item label='Количество' name='replays'>
                                <InputNumber
                                    min={1}
                                    size='small'
                                    placeholder='3'
                                    readOnly={readOnly}
                                    data-test-id={`modal-drawer-right-input-quantity${index}`}
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
