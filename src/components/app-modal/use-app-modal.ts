import { useContext } from 'react';
import { AppModalContext } from './app-modal-provider';
import invariant from 'invariant';

export const useAppModal = () => {
    const context = useContext(AppModalContext);
    invariant(context, 'Out of AppModal context');
    return context;
};
