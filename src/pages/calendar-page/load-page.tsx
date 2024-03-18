import { useAppLoader } from '@components/app-loader';
import { useAppModal } from '@components/app-modal';
import { useFetchTrainingListState, useLazyFetchTrainingListQuery } from '@redux/training';
import { Path } from '@router/paths';
import { ModalProps } from 'antd';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const errorModalProps = { 'data-test-id': 'modal-no-review' } as ModalProps;

export const LoadCalendarPage = ({ render }: { render: (load: () => void) => ReactNode }) => {
    const [fetchTrainingList] = useLazyFetchTrainingListQuery();
    const { isSuccess } = useFetchTrainingListState();
    const appLoader = useAppLoader();
    const appModal = useAppModal();
    const navigate = useNavigate();

    const load = async () => {
        if (!isSuccess) appLoader.open();

        try {
            await Promise.all([
                import('@pages/calendar-page/calendar-page'),
                fetchTrainingList(undefined, true).unwrap(),
            ]);
        } catch {
            appLoader.close();
            appModal.serverError(errorModalProps);
            return;
        }

        navigate(Path.Calendar);
    };

    return render(load);
};
