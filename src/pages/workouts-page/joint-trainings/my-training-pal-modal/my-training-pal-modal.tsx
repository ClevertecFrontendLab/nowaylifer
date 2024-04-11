import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { Button } from '@components/button';
import { Modal, ModalProps } from '@components/modal';
import { TrainingPal } from '@redux/catalogs';
import { Avatar, Row, Typography } from 'antd';

import styles from './my-training-pal-modal.module.less';

type MyTrainingPalModalProps = ModalProps & {
    open: boolean;
    onCancelInvite?(): void;
    pal?: TrainingPal | null;
};

export const MyTrainingPalModal = ({ pal, onCancelInvite, ...props }: MyTrainingPalModalProps) => (
    <Modal
        className={styles.Modal}
        destroyOnClose={true}
        footer={null}
        {...props}
        data-test-id='partner-modal'
    >
        <Row align='middle' justify='space-between' style={{ marginBottom: 24 }}>
            <Row className={styles.AvatarContainer}>
                <Avatar
                    icon={<UserOutlined style={{ color: 'var(--character-light-title-85)' }} />}
                    size='large'
                    src={pal?.imageSrc}
                    style={{ width: 42, height: 42, background: 'var(--theme-gray-3)' }}
                />
                <Typography.Paragraph className={styles.UserName}>{pal?.name}</Typography.Paragraph>
            </Row>
            <dl className={styles.Dl}>
                <dt>Тип тренировки</dt>
                <dd>{pal?.trainingType}</dd>
                <dt>Средняя нагрузка</dt>
                <dd>{pal?.avgWeightInWeek} кг/нед</dd>
            </dl>
        </Row>
        <Row align='middle' justify='space-between'>
            <div>
                тренировка одобрена
                <span style={{ marginLeft: 9 }}>
                    <CheckCircleFilled style={{ color: 'var(--ant-success-color)' }} />
                </span>
            </div>
            <Button onClick={onCancelInvite} size='large'>
                Отменить тренировку
            </Button>
        </Row>
    </Modal>
);
