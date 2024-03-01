import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Rate, RateProps } from 'antd';
import { createElement } from 'react';

export const Rating = (props: RateProps) => (
    <Rate
        character={({ index = 0, value = 0 }) =>
            createElement(index + 1 <= value ? StarFilled : StarOutlined, {
                style: { width: 14, height: 'auto', color: 'var(--ant-warning-color)' },
            })
        }
        {...props}
    />
);
