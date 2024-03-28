import { CSSProperties, useMemo } from 'react';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUser, User } from '@redux/user';
import { Table } from 'antd';
import cn from 'classnames';

import { dataSource } from './data-source';
import styles from './tariffs-info-table.module.less';

const renderCell = (value: boolean) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {value ? (
            <CheckCircleFilled style={{ fontSize: 18 }} />
        ) : (
            <CloseCircleOutlined
                style={{ fontSize: 18, color: 'var(--character-light-disable-25)' }}
            />
        )}
    </div>
);

const getColumns = (user: User | undefined) => [
    {
        title: '',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: (
            <div
                style={{
                    textAlign: 'center',
                    padding: '4px 8px',
                    background: 'var(--theme-gray-4)',
                    color: 'var(--character-light-title-85)',
                }}
            >
                FREE
            </div>
        ),
        dataIndex: 'free',
        key: 'free',
        render: renderCell,
    },
    {
        title: (
            <div
                style={{
                    textAlign: 'center',
                    padding: '4px 8px',
                    paddingRight: user?.tariff ? 0 : 8,
                    background: 'var(--theme-primary-light-1)',
                    color: 'var(--theme-primary-light-7)',
                }}
            >
                PRO
                {user?.tariff && (
                    <CheckCircleOutlined
                        style={{ color: 'var(--ant-success-color)', marginLeft: 4 }}
                    />
                )}
            </div>
        ),
        dataIndex: 'pro',
        key: 'pro',
        render: renderCell,
    },
];

export const TariffsInfoTable = ({
    className,
    style,
}: {
    className?: string;
    style?: CSSProperties;
}) => {
    const user = useAppSelector(selectUser);
    const columns = useMemo(() => getColumns(user), [user]);

    return (
        <Table
            className={cn(styles.Table, className)}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            style={style}
        />
    );
};
