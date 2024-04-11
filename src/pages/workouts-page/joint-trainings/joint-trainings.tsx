import { Fragment, useState } from 'react';
import { AppLoader } from '@components/app-loader';
import { TrainingPal, useFetchMyTrainingPalsQuery } from '@redux/catalogs';
import { useCancelInviteMutation, useFetchInvitesQuery } from '@redux/joint-training';
import { Col, Row, Typography } from 'antd';
import invariant from 'invariant';

import { InviteList } from './invite-list/invite-list';
import { MyTrainingPalCard } from './my-training-pal-card';
import { MyTrainingPalModal } from './my-training-pal-modal';
import { SearchTrainingPalBanner } from './search-training-pal-banner';
import { SearchTrainingPals, SearchTrainingPalsProps } from './search-training-pals';

type SearchScreenState = {
    open: boolean;
    type: SearchTrainingPalsProps['type'];
};

export const JointTrainings = () => {
    const {
        data: pals,
        refetch,
        isFetching: isMyTrainingPalsFetching,
    } = useFetchMyTrainingPalsQuery();
    const { data: invites, isLoading: isInvitesFetching } = useFetchInvitesQuery();
    const [searchScreen, setSearchScreen] = useState<SearchScreenState>({
        open: false,
        type: 'random',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalPal, setModalPal] = useState<TrainingPal | null>(null);

    const [cancelInvite, { isLoading }] = useCancelInviteMutation();

    const [showPalsScreen, setShowPalsScreen] = useState(true);

    const handleModalOpen = (pal: TrainingPal) => {
        setModalOpen(true);
        setModalPal(pal);
    };

    const handleCancelInvite = async () => {
        invariant(modalPal?.inviteId, 'InviteId is undefined');

        try {
            await cancelInvite(modalPal.inviteId).unwrap();
            setModalOpen(false);
            setShowPalsScreen(false);
        } catch {
            // ignore
        }
    };

    if (showPalsScreen && pals?.length) {
        return (
            <Fragment>
                <AppLoader open={isLoading} />
                <MyTrainingPalModal
                    onCancel={() => setModalOpen(false)}
                    onCancelInvite={handleCancelInvite}
                    open={modalOpen}
                    pal={modalPal}
                />
                <Row gutter={16}>
                    {pals.map((pal) => (
                        <Col>
                            <MyTrainingPalCard onClick={() => handleModalOpen(pal)} pal={pal} />
                        </Col>
                    ))}
                </Row>
            </Fragment>
        );
    }

    const handleAccept = async () => {
        try {
            await refetch().unwrap();
        } catch {
            // ignore
        }

        setShowPalsScreen(true);
    };

    return searchScreen.open ? (
        <SearchTrainingPals
            onGoBack={() => setSearchScreen((prev) => ({ ...prev, open: false }))}
            type={searchScreen.type}
        />
    ) : (
        <Fragment>
            <AppLoader open={isMyTrainingPalsFetching || isInvitesFetching} />
            {invites && <InviteList invites={invites} onAccept={handleAccept} />}
            <SearchTrainingPalBanner
                onRandomSelect={() => setSearchScreen({ open: true, type: 'random' })}
                onSelect={() => setSearchScreen({ open: true, type: 'mostPopular' })}
            />
            <Typography.Paragraph style={{ fontWeight: 500, fontSize: 20 }}>
                Мои партнёры по тренировкам
            </Typography.Paragraph>
            {pals && (
                <Row gutter={16}>
                    {pals.map((pal, index) => (
                        <Col key={pal.id}>
                            <MyTrainingPalCard
                                data-test-id={`joint-training-cards${index}`}
                                pal={pal}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    );
};
