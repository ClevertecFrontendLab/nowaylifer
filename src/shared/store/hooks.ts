import { createSelector } from '@reduxjs/toolkit';
import { useRef } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
export const createAppSelector = createSelector.withTypes<RootState>();

export const useAppSelectorRef = <T = unknown>(selector: (state: RootState) => T) => {
    const ref = useRef<T>(undefined);

    useAppSelector(selector, (_, b) => {
        ref.current = b;
        return true;
    });

    return ref as React.RefObject<T>;
};
