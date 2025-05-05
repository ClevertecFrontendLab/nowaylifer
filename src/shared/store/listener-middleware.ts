import { addListener, createListenerMiddleware } from '@reduxjs/toolkit';

export const listenerMiddleware = createListenerMiddleware();
export const startAppListening = listenerMiddleware.startListening.withTypes<
    RootState,
    AppDispatch
>();
export const addAppListener = addListener.withTypes<RootState, AppDispatch>();
