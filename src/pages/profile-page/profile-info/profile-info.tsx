import { useEffect } from 'react';
import { Modal } from '@components/modal';
import { PageContentCard } from '@components/page-content-card';
import { PasswordFormItem } from '@components/password-form-item';
import { useXss } from '@hooks/use-breakpoint';
import { EditUserDTO, User } from '@redux/user';
import * as rules from '@utils/validation-rules';
import { Button, Col, DatePicker, Form, Input, Row, Typography } from 'antd';
import moment from 'moment';

import { UploadAvatar, UploadAvatarFile } from './upload-avatar/upload-avatar';
import styles from './profile-info.module.less';
import { MaxFileSizeExceededError } from './upload-avatar';

type FormValues = Partial<
    Omit<User, 'tariff' | 'sendNotification' | 'readyForJointTraining' | 'imgSrc'>
> & {
    password?: string;
    confirmPassword?: string;
    uploadAvatarFile?: UploadAvatarFile;
};

type ProfileInfoProps = {
    user: User;
    onEditUser?(dto: EditUserDTO): void;
};

const MAX_AVATAR_SIZE = 5;

export const ProfileInfo = ({ user, onEditUser }: ProfileInfoProps) => {
    const [form] = Form.useForm<FormValues>();
    const password = Form.useWatch('password', form);
    const xss = useXss();

    useEffect(() => {
        form.resetFields();
    }, [user, form]);

    const handleFinish = ({ uploadAvatarFile, ...changes }: FormValues) => {
        const imgSrc =
            uploadAvatarFile && 'response' in uploadAvatarFile
                ? `https://training-api.clevertec.ru${uploadAvatarFile.response?.url}`
                : uploadAvatarFile?.thumbUrl;

        onEditUser?.({ ...user, ...changes, imgSrc });
    };

    return (
        <PageContentCard>
            <Form className={styles.Form} form={form} onFinish={handleFinish}>
                <Typography.Title className={styles.FormHeading} level={5}>
                    Личная информация
                </Typography.Title>
                <Row className={styles.PersonalInfoRow}>
                    <Col className={styles.AvatarCol}>
                        <Form.Item<FormValues>
                            initialValue={
                                user.imgSrc
                                    ? {
                                          name: 'avatar',
                                          status: 'done',
                                          thumbUrl: user.imgSrc,
                                      }
                                    : undefined
                            }
                            name='uploadAvatarFile'
                            rules={[
                                {
                                    message: '',
                                    validator: (_, file: UploadAvatarFile) =>
                                        ['error', 'uploading'].includes(file.status as string)
                                            ? Promise.reject()
                                            : Promise.resolve(),
                                },
                            ]}
                            style={{ marginBottom: 0 }}
                        >
                            <UploadAvatar
                                fileType={xss ? 'picture' : 'picture-card'}
                                maxSize={MAX_AVATAR_SIZE}
                                onError={(e) =>
                                    e instanceof MaxFileSizeExceededError &&
                                    Modal.error({
                                        title: (
                                            <Typography.Text>Файл слишком большой</Typography.Text>
                                        ),
                                        content: (
                                            <Typography.Paragraph>
                                                Выберите файл размером меньше {MAX_AVATAR_SIZE}МБ.
                                            </Typography.Paragraph>
                                        ),
                                        okText: 'Закрыть',
                                        okButtonProps: { 'data-test-id': 'big-file-error-close' },
                                    })
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col flex={1}>
                        <Form.Item<FormValues> initialValue={user.firstName} name='firstName'>
                            <Input data-test-id='profile-name' placeholder='Имя' size='large' />
                        </Form.Item>
                        <Form.Item<FormValues> initialValue={user.lastName} name='lastName'>
                            <Input
                                data-test-id='profile-surname'
                                placeholder='Фамилия'
                                size='large'
                            />
                        </Form.Item>
                        <Form.Item<FormValues>
                            initialValue={user.birthday ? moment(user.birthday) : undefined}
                            name='birthday'
                            style={{ marginBottom: 0 }}
                        >
                            <DatePicker
                                data-test-id='profile-birthday'
                                format='DD.MM.YYYY'
                                placeholder='Дата рождения'
                                size='large'
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Typography.Title className={styles.FormHeading} level={5}>
                    Приватность и авторизация
                </Typography.Title>
                <div style={{ maxWidth: 480 }}>
                    <Form.Item<FormValues>
                        initialValue={user.email}
                        name='email'
                        rules={[rules.required, rules.email]}
                    >
                        <Input addonBefore='e-mail:' data-test-id='profile-email' size='large' />
                    </Form.Item>
                    <PasswordFormItem
                        inputProps={{ 'data-test-id': 'profile-password' }}
                        name='password'
                    />
                    <Form.Item<FormValues>
                        dependencies={['password']}
                        name='confirmPassword'
                        rules={[{ required: !!password, message: '' }, rules.confirmPassword()]}
                        style={{ marginBottom: 54 }}
                    >
                        <Input.Password
                            data-test-id='profile-repeat-password'
                            placeholder='Повторите пароль'
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        {() => (
                            <Button
                                data-test-id='profile-submit'
                                disabled={
                                    !form.isFieldsTouched() ||
                                    form.getFieldsError().filter(({ errors }) => errors.length)
                                        .length > 0
                                }
                                htmlType='submit'
                                size='large'
                            >
                                Сохранить изменения
                            </Button>
                        )}
                    </Form.Item>
                </div>
            </Form>
        </PageContentCard>
    );
};
