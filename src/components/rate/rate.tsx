import { createElement } from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Rate as RateAntd, RateProps } from 'antd';

export const Rate = ({ size = 14, ...props }: RateProps & { size?: number }) => (
    <RateAntd
        character={({ index = 0, value = 0 }) =>
            createElement(index + 1 <= value ? StarFilled : StarOutlined, {
                style: { width: size, height: 'auto', color: 'var(--ant-warning-color)' },
            })
        }
        {...props}
    />
);
