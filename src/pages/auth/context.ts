import { createContext } from '@chakra-ui/utils';

import { ToastFunction } from '~/shared/infra/toast';

export const [AuthToastProvider, useAuthToast] = createContext<ToastFunction>({
    providerName: 'AuthToastProvider',
});
