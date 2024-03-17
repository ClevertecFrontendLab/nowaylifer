import { CreateExerciseDTO } from '@redux/training';
import { Col, Form, FormInstance, FormProps, Input, InputNumber, Row } from 'antd';
import cn from 'classnames';
import { forwardRef, useImperativeHandle } from 'react';
import styles from './exercise-form.module.less';

export type ExerciseFormValues = Omit<CreateExerciseDTO, 'isImplementation'>;
export type ExerciseFormProps = Omit<FormProps, 'form'> & {
    readOnly?: boolean;
};

export const ExerciseForm = forwardRef<
    { form: FormInstance<ExerciseFormValues> },
    ExerciseFormProps
>(({ className, readOnly, ...props }, ref) => {
    const [form] = Form.useForm<ExerciseFormValues>();
    useImperativeHandle(ref, () => ({ form }));

    return (
        <Form form={form} layout='vertical' className={cn(styles.Form, className)} {...props}>
            <Form.Item name='name' style={{ marginBottom: 7 }}>
                <Input
                    size='small'
                    placeholder='Упражнение'
                    addonAfter={<div style={{ width: 17 }} />}
                    readOnly={readOnly}
                />
            </Form.Item>
            <Row justify='space-between'>
                <Col style={{ maxWidth: 120 }}>
                    <Form.Item label='Повторы' name='replays'>
                        <InputNumber
                            min={1}
                            size='small'
                            addonBefore='+'
                            placeholder='1'
                            readOnly={readOnly}
                        />
                    </Form.Item>
                </Col>
                <Row>
                    <Col style={{ maxWidth: 89 }}>
                        <Form.Item label='Вес, кг' name='weight'>
                            <InputNumber min={0} size='small' placeholder='0' readOnly={readOnly} />
                        </Form.Item>
                    </Col>
                    <Col className={styles.MultiplySign}>x</Col>
                    <Col style={{ maxWidth: 89 }}>
                        <Form.Item label='Количество' name='approaches'>
                            <InputNumber min={1} size='small' placeholder='3' readOnly={readOnly} />
                        </Form.Item>
                    </Col>
                </Row>
            </Row>
        </Form>
    );
});
ExerciseForm.displayName = 'ExerciseForm';
