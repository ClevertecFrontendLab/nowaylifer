import { CSSProperties } from 'react';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from '@components/button';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingTypeMap } from '@redux/catalogs';
import { Training } from '@redux/training';
import { Row, Table } from 'antd';
import cn from 'classnames';

import { trainingPeriods } from '../training-periods';

import styles from './training-table.module.less';

type RecordType = {
    key: string;
    training: Training;
};

type TrainingTableProps = {
    trainings: Training[];
    className?: string;
    style?: CSSProperties;
};

export const TrainingTable = ({ trainings, className, style }: TrainingTableProps) => {
    const trainingTypeMap = useAppSelector(selectTrainingTypeMap);
    const data = trainings.map<RecordType>((training) => ({ key: training._id, training }));

    return (
        <Table<RecordType>
            className={cn(styles.Table, className)}
            columns={[
                {
                    title: <div className={styles.ColTitle}>Тип тренировки</div>,
                    dataIndex: ['training', 'name'],
                    width: 260,
                    render: (value: string) => (
                        <Row justify='space-between'>
                            <TrainingTypeBadge
                                style={{ gap: 'var(--space-3)' }}
                                trainingType={trainingTypeMap[value]}
                            />
                            <Button icon={<DownOutlined style={{ fontSize: 10 }} />} type='text' />
                        </Row>
                    ),
                },
                {
                    key: 'space',
                    width: 12,
                },
                {
                    title: <div className={styles.ColTitle}>Сортировка по периоду</div>,
                    dataIndex: ['training', 'parameters', 'period'],
                    width: 288,
                    sorter: (a, b) => {
                        const aPeriod = a.training.parameters?.period;
                        const bPeriod = b.training.parameters?.period;

                        if (aPeriod && bPeriod) return aPeriod - bPeriod;
                        if (aPeriod) return 1;
                        if (bPeriod) return -1;

                        return 0;
                    },
                    render: (value: number | undefined) => (
                        <Row
                            justify='space-between'
                            style={{ flexWrap: 'nowrap', gap: 'var(--space-3)' }}
                        >
                            <Row
                                align='middle'
                                style={{
                                    width: '100%',
                                    borderBottom: '1px solid rgba(0, 0, 0, .06)',
                                }}
                            >
                                {value
                                    ? trainingPeriods.find((p) => p.value === value)?.label
                                    : null}
                            </Row>
                            <Button icon={<EditOutlined style={{ fontSize: 25 }} />} type='link' />
                        </Row>
                    ),
                },
            ]}
            dataSource={data}
            pagination={{
                pageSize: 14,
                position: ['bottomLeft'],
                className: styles.Pagination,
            }}
            size='small'
            style={style}
        />
    );
};
