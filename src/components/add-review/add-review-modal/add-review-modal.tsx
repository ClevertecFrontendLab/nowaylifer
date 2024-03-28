import { useState } from 'react';
import { Modal } from '@components/modal';
import { Rate } from '@components/rate';
import { CreateReviewDTO } from '@redux/reviews';
import { Button, Form, Input, ModalProps } from 'antd';

import styles from './add-review-modal.module.less';

const { TextArea } = Input;

type AddReviewModalProps = Pick<ModalProps, 'open' | 'onCancel'> & {
    onSubmit: (values: CreateReviewDTO) => void;
};

export const AddReviewModal = ({ open, onCancel, onSubmit }: AddReviewModalProps) => {
    const [form] = Form.useForm<CreateReviewDTO>();
    const [formValid, setFormValid] = useState(false);

    const handleRateChagne = async () => {
        try {
            await form.validateFields();
            setFormValid(true);
        } catch {
            setFormValid(false);
        }
    };

    const handleSubmit = () => {
        onSubmit(form.getFieldsValue());
    };

    return (
        <Modal
            centered={true}
            footer={
                <Button
                    className={styles.OkBtn}
                    data-test-id='new-review-submit-button'
                    disabled={!formValid}
                    onClick={handleSubmit}
                    size='large'
                    type='primary'
                >
                    Опубликовать
                </Button>
            }
            onCancel={onCancel}
            open={open}
            title='Ваш отзыв'
        >
            <Form form={form}>
                <Form.Item name='rating' required={true} style={{ marginBottom: 16 }}>
                    <Rate onChange={handleRateChagne} size={24} />
                </Form.Item>
                <Form.Item name='message' style={{ marginBottom: 0 }}>
                    <TextArea
                        autoSize={{ minRows: 2, maxRows: 10 }}
                        className={styles.TextArea}
                        placeholder='Расскажите, почему Вам понравилось наше приложение'
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
