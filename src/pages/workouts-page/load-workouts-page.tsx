import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppLoader } from '@components/app-loader';
import { useAppModal } from '@components/app-modal';
import { useFetchTrainingListState, useLazyFetchTrainingListQuery } from '@redux/training';
import { RoutePath } from '@router/paths';
import { ModalProps } from 'antd';

const errorModalProps = { 'data-test-id': 'modal-no-review' } as ModalProps;

export const WORKOUTS_PAGE_LOADER_ID = 'LOAD_CALENDAR_PAGE';

export const LoadWorkoutsPage = ({ render }: { render: (load: () => void) => ReactNode }) => {
    const [fetchTrainingList] = useLazyFetchTrainingListQuery();
    const { isSuccess } = useFetchTrainingListState();
    const appLoader = useAppLoader();
    const appModal = useAppModal();
    const navigate = useNavigate();

    const load = async () => {
        if (!isSuccess) appLoader.open(WORKOUTS_PAGE_LOADER_ID);

        try {
            await Promise.all([
                import('@pages/workouts-page/workouts-page'),
                fetchTrainingList(undefined, true).unwrap(),
            ]);
        } catch {
            appLoader.close(WORKOUTS_PAGE_LOADER_ID);
            appModal.serverError(errorModalProps);

            return;
        }

        navigate(RoutePath.Workouts);
    };

    return render(load);
};
