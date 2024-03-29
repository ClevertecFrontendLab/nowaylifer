import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleFilled } from '@ant-design/icons';
import { AddReview } from '@components/add-review';
import { Card } from '@components/card';
import { ResultModal } from '@components/result-modal';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { logout } from '@redux/auth/actions';
import { Tariff } from '@redux/catalogs';
import { useRequestBuyTariffMutation } from '@redux/tariff';
import { selectUser } from '@redux/user';
import { RoutePath } from '@router/paths';
import { Button, Row, Typography } from 'antd';

import styles from './settings.module.less';
import { SettingsForm } from './settings-form';
import { TariffCard } from './tariff-card';
import { TariffsDrawer } from './tariffs-drawer';

export const Settings = ({ tariffs }: { tariffs: Tariff[] }) => {
    const [showAddReview, setShowAddReview] = useState(false);
    const [requestBuyTariff] = useRequestBuyTariffMutation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSelectTariff = ({ _id }: Tariff, days: number) => {
        requestBuyTariff({ tariffId: _id, days });
        setShowModal(true);
    };

    return (
        <Fragment>
            <AddReview onOpenChange={setShowAddReview} open={showAddReview} />
            <ResultModal
                bodyStyle={{ paddingInline: 32, paddingBottom: 56 }}
                closable={true}
                onCancel={() => dispatch(logout())}
                open={showModal}
                resultProps={{
                    icon: <CheckCircleFilled style={{ color: 'var(--theme-primary-light-6)' }} />,
                    status: 'success',
                    title: 'Чек для оплаты у вас на почте',
                    subTitle: (
                        <span style={{ color: 'var(--character-light-secondary-45)' }}>
                            Мы отправили инструкцию для оплаты вам на e-mail{' '}
                            <span style={{ fontWeight: 500 }}>{user?.email}.</span> После
                            подтверждения оплаты войдите в приложение заново.
                        </span>
                    ),
                    extra: (
                        <span style={{ color: 'var(--character-light-secondary-45)' }}>
                            Не пришло письмо? Проверьте папку Спам.
                        </span>
                    ),
                }}
                width={540}
            />
            <TariffsDrawer
                onClose={() => setDrawerOpen(false)}
                onSelectTariff={handleSelectTariff}
                open={drawerOpen}
                tariff={tariffs[1]}
            />
            <Card className={styles.TariffInfoCard}>
                <Typography.Title className={styles.Title} level={3}>
                    Мой тариф
                </Typography.Title>
                <Row className={styles.CardList}>
                    {tariffs.map((tariff) => (
                        <TariffCard
                            key={tariff._id}
                            onDetailsClick={() => setDrawerOpen(true)}
                            tariff={tariff}
                        />
                    ))}
                </Row>
                <SettingsForm className={styles.SettingsForm} />
                <Row className={styles.ButtonsRow}>
                    <Button onClick={() => setShowAddReview(true)} size='large' type='primary'>
                        Написать отзыв
                    </Button>
                    <Button onClick={() => navigate(RoutePath.Feedback)} size='large' type='link'>
                        Смотреть все отзывы
                    </Button>
                </Row>
            </Card>
        </Fragment>
    );
};
