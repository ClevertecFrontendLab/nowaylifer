import { createListenerMiddleware } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './configure-store';

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
    RootState,
    AppDispatch
>();
