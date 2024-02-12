import { Grid } from 'antd';
import { useMediaQuery } from 'react-responsive';

export const { useBreakpoint } = Grid;

export const useXs = (and: 'up' | 'below' = 'below') =>
    useMediaQuery(and === 'below' ? { maxWidth: 575 } : { minWidth: 575 });
