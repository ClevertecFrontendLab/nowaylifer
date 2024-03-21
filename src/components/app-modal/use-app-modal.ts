import { useInvariantContext } from '@hooks/use-invariant-context';

import { AppModalContext } from './app-modal-provider';

export const useAppModal = () => useInvariantContext(AppModalContext);
