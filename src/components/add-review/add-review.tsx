import { Fragment, useEffect, useRef, useState } from 'react';
import { AppLoader } from '@components/app-loader';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { addAppListener } from '@redux/listener-middleware';
import {
    CreateReviewDTO,
    reviewsApi,
    useAddReviewMutation,
    useFetchAllReviewsQuery,
} from '@redux/reviews';

import { AddReviewModal } from './add-review-modal';
import { AddReviewErrorModal, AddReviewSuccessModal } from './result-modals';

type AddReviewProps = {
    open?: boolean;
    onOpenChange?(open: boolean): void;
    refetchOnSuccess?: boolean;
};

export const AddReview = ({ open, onOpenChange, refetchOnSuccess = false }: AddReviewProps) => {
    const [addReveiw, { isLoading }] = useAddReviewMutation();
    const { refetch: refetchReviews, isFetching } = useFetchAllReviewsQuery();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showModal, setShowModal] = useState(open ?? false);
    const prevOpenProp = useRef(open);
    const dispatch = useAppDispatch();

    const isSomethingOpen = showModal || showErrorModal || showSuccessModal;

    useEffect(() => {
        onOpenChange?.(isSomethingOpen);
    }, [isSomethingOpen, onOpenChange]);

    useEffect(() => {
        if (open !== undefined && open !== prevOpenProp.current) {
            prevOpenProp.current = open;
            setShowSuccessModal(false);
            setShowErrorModal(false);
            setShowModal(open);
        }
    }, [open]);

    useEffect(() => {
        let unsubscribe: () => void | undefined;

        if (refetchOnSuccess) {
            unsubscribe = dispatch(
                addAppListener({
                    matcher: reviewsApi.endpoints.addReview.matchFulfilled,
                    effect: async (_, { condition }) => {
                        await condition(reviewsApi.endpoints.fetchAllReviews.matchFulfilled);
                        setShowModal(false);
                        setShowSuccessModal(true);
                    },
                }),
            );
        }

        return () => unsubscribe?.();
    }, [dispatch, refetchOnSuccess]);

    const retryAddReview = () => {
        setShowErrorModal(false);
        setShowModal(true);
    };

    const handleSubmitReveiw = async (dto: CreateReviewDTO) => {
        try {
            await addReveiw(dto).unwrap();
        } catch {
            setShowModal(false);
            setShowErrorModal(true);

            return;
        }

        if (refetchOnSuccess) {
            await refetchReviews();
        } else {
            setShowModal(false);
            setShowSuccessModal(true);
        }
    };

    return (
        <Fragment>
            <AppLoader open={isLoading || (refetchOnSuccess && isFetching)} />
            <AddReviewSuccessModal
                onOk={() => setShowSuccessModal(false)}
                open={showSuccessModal}
            />
            <AddReviewErrorModal
                onCancel={() => setShowErrorModal(false)}
                onRetry={retryAddReview}
                open={showErrorModal}
            />
            <AddReviewModal
                onCancel={() => setShowModal(false)}
                onSubmit={handleSubmitReveiw}
                open={showModal}
            />
        </Fragment>
    );
};
