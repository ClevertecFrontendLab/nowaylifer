import { useState } from 'react';
import { Drawer, DrawerProps } from '@components/drawer';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Tariff } from '@redux/catalogs';
import { selectUser } from '@redux/user';
import { Button, Radio, Space, Typography } from 'antd';

import { TariffsInfoTable } from './tariffs-info-table/tariffs-info-table';
import styles from './tariffs-drawer.module.less';

type TariffsDrawerProps = DrawerProps & {
    tariff: Tariff;
    onSelectTariff?(tariff: Tariff, days: number): void;
};

export const TariffsDrawer = ({ tariff, onSelectTariff, ...props }: TariffsDrawerProps) => {
    const user = useAppSelector(selectUser);
    const [selectedDays, setSelectedDays] = useState();

    return (
        <Drawer
            className={styles.TariffDrawer}
            footer={
                user?.tariff ? null : (
                    <Button
                        block={true}
                        disabled={!selectedDays}
                        onClick={() => selectedDays && onSelectTariff?.(tariff, selectedDays)}
                        size='large'
                        style={{ fontSize: 14 }}
                        type='primary'
                    >
                        Выбрать и оплатить
                    </Button>
                )
            }
            title='Сравнить тарифы'
            {...props}
        >
            {user?.tariff && (
                <Typography.Paragraph className={styles.ActiveTariff}>
                    Ваш PRO tariff активен до 04.07
                </Typography.Paragraph>
            )}
            <TariffsInfoTable style={{ marginBottom: 70 }} />
            <Typography.Paragraph style={{ fontWeight: 700, marginBottom: 24 }}>
                Стоимость тарифа
            </Typography.Paragraph>
            {!user?.tariff && (
                <Radio.Group
                    className={styles.RadioGroup}
                    onChange={(e) => setSelectedDays(e.target.value)}
                    value={selectedDays}
                >
                    <Space direction='vertical' size={16}>
                        {tariff.periods.map((period) => (
                            <Radio name='days' value={period.days}>
                                <span style={{ marginRight: 'auto' }}>{period.text}</span>
                                <span style={{ fontSize: 16, fontWeight: 500 }}>
                                    {period.cost.toLocaleString('ru')} $
                                </span>
                            </Radio>
                        ))}
                    </Space>
                </Radio.Group>
            )}
        </Drawer>
    );
};
