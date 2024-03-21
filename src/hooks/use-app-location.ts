import { Location, useLocation } from 'react-router-dom';

export type LocationWithState = {
    state?: {
        from?: Location;
    };
};

export const useAppLocation = () => useLocation() as LocationWithState;
