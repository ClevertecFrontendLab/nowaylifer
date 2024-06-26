import { useMediaQuery } from 'react-responsive';
import { Grid } from 'antd';

export const { useBreakpoint } = Grid;

export const useXs = (and: 'up' | 'below' = 'below') =>
    useMediaQuery(and === 'below' ? { maxWidth: 575 } : { minWidth: 575 });

export const useXss = (and: 'up' | 'below' = 'below') =>
    useMediaQuery(and === 'below' ? { maxWidth: 480 } : { minWidth: 480 });
