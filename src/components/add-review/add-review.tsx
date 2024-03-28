import { Fragment, useEffect, useRef, useState } from 'react';
import { AppLoader } from '@components/app-loader';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { addAppListener } from '@redux/listener-middleware';
import { CreateReviewDTO, reviewsApi, useAddReviewMutation } from '@redux/reviews';

import { AddReviewModal } from './add-review-modal';
import { AddReviewErrorModal, AddReviewSuccessModal } from './result-modals';

type AddReviewProps = {
    open?: boolean;
    onOpenChange?(open: boolean): void;
};

export const AddReview = ({ open, onOpenChange }: AddReviewProps) => {
    const [addReveiw, { isLoading }] = useAddReviewMutation();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showModal, setShowModal] = useState(open ?? false);
    const dispatch = useAppDispatch();
    const prevOpenProp = useRef(open);

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

    useEffect(
        () =>
            dispatch(
                addAppListener({
                    matcher: reviewsApi.endpoints.addReview.matchFulfilled,
                    effect: async (_, { condition }) => {
                        await condition(reviewsApi.endpoints.fetchAllReviews.matchFulfilled);
                        setShowModal(false);
                        setShowSuccessModal(true);
                    },
                }),
            ),
        [dispatch],
    );

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
        }
    };

    return (
        <Fragment>
            <AppLoader open={isLoading} />
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
