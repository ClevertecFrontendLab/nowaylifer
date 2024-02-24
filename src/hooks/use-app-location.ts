import { useLocation } from 'react-router';
import { Location } from 'react-router-dom';

export type LocationWithState = {
    state?: {
        from?: Location;
    };
};

export const useAppLocation = () => useLocation() as LocationWithState;
