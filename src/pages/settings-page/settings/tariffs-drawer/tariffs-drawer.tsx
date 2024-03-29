import { useState } from 'react';
import { Drawer, DrawerProps } from '@components/drawer';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Tariff } from '@redux/catalogs';
import { selectUser } from '@redux/user';
import { Button, Radio, Space, Typography } from 'antd';
import moment from 'moment';

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
            data-test-id='tariff-sider'
            footer={
                user?.tariff ? null : (
                    <Button
                        block={true}
                        data-test-id='tariff-submit'
                        disabled={!selectedDays}
                        onClick={() => selectedDays && onSelectTariff?.(tariff, selectedDays)}
                        size='large'
                        style={{ fontSize: 'var(--font-size-sm)' }}
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
                    Ваш PRO tariff активен до {moment(user.tariff.expired).local().format('DD.MM')}
                </Typography.Paragraph>
            )}
            <TariffsInfoTable style={{ marginBottom: 70 }} />
            {!user?.tariff && (
                <div data-test-id='tariff-cost'>
                    <Typography.Paragraph
                        style={{ fontWeight: 700, marginBottom: 'var(--space-5)' }}
                    >
                        Стоимость тарифа
                    </Typography.Paragraph>
                    <Radio.Group
                        className={styles.RadioGroup}
                        onChange={(e) => setSelectedDays(e.target.value)}
                        value={selectedDays}
                    >
                        <Space direction='vertical' size={16}>
                            {tariff.periods.map((period) => (
                                <Radio
                                    key={period.days}
                                    data-test-id={period.cost === 10 ? 'tariff-10' : undefined}
                                    name='days'
                                    value={period.days}
                                >
                                    <span style={{ marginRight: 'auto' }}>{period.text}</span>
                                    <span
                                        style={{ fontSize: 'var(--font-size-md)', fontWeight: 500 }}
                                    >
                                        {period.cost.toLocaleString('ru')} $
                                    </span>
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>
            )}
        </Drawer>
    );
};
