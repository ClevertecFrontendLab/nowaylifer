import { Modal } from '@components/modal';
import { CreateReviewDTO } from '@redux/reviews';
import { Form, Input, ModalProps } from 'antd';
import { useState } from 'react';
import { Rate } from '../rate';
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
            centered
            open={open}
            title='Ваш отзыв'
            okText='Опубликовать'
            onCancel={onCancel}
            onOk={handleSubmit}
            cancelButtonProps={{ hidden: true }}
            okButtonProps={{ size: 'large', disabled: !formValid, className: styles.OkBtn }}
        >
            <Form form={form}>
                <Form.Item name='rating' required style={{ marginBottom: 16 }}>
                    <Rate size={24} onChange={handleRateChagne} />
                </Form.Item>
                <Form.Item name='message' style={{ marginBottom: 0 }}>
                    <TextArea
                        placeholder='Расскажите, почему Вам понравилось наше приложение'
                        autoSize={{ minRows: 2, maxRows: 10 }}
                        className={styles.TextArea}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
