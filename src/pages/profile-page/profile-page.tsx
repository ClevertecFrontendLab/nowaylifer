import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLoader } from '@components/app-loader';
import { Breadcrumbs } from '@components/breadcrumbs';
import { Modal } from '@components/modal';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { SettingsButton } from '@components/settings-button';
import { EditUserDTO, useEditCurrentUserMutation, useFetchCurrentUserQuery } from '@redux/user';
import { RoutePath } from '@router/paths';
import { Alert, notification, Row, Typography } from 'antd';

import { ProfileInfo } from './profile-info';
import styles from './profile-page.module.less';

const ProfilePage = () => {
    const { data: user, isFetching: isUserFetching } = useFetchCurrentUserQuery();
    const [editUser, { isLoading: isEditUserLoading }] = useEditCurrentUserMutation();
    const navigate = useNavigate();

    const handleEditUser = async (dto: EditUserDTO) => {
        try {
            await editUser(dto).unwrap();
        } catch {
            Modal.error({
                title: <Typography.Text>При сохранении данных произошла ошибка</Typography.Text>,
                content: <Typography.Paragraph>Придётся попробовать ещё раз</Typography.Paragraph>,
            });

            return;
        }

        notification.open({
            duration: 1e6,
            closeIcon: null,
            placement: 'bottom',
            key: 'editUserSuccessAlert',
            className: styles.SuccessNotification,
            message: (
                <Alert
                    closable={true}
                    data-test-id='alert'
                    message='Данные профиля успешно обновлены'
                    onClose={() => notification.close('editUserSuccessAlert')}
                    showIcon={true}
                    type='success'
                />
            ),
        });
    };

    return (
        <Fragment>
            <AppLoader open={isUserFetching || isEditUserLoading} />
            <PageLayout>
                <PageHeader>
                    <Row justify='space-between'>
                        <Breadcrumbs />
                        <SettingsButton
                            data-test-id='header-settings'
                            onClick={() => navigate(RoutePath.Settings)}
                        />
                    </Row>
                </PageHeader>
                <PageContent className={styles.Content}>
                    {user && <ProfileInfo onEditUser={handleEditUser} user={user} />}
                </PageContent>
            </PageLayout>
        </Fragment>
    );
};

export default ProfilePage;
