import { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { BACKEND_URL } from '@constants/config';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Button, Row, Typography, Upload, UploadFile, UploadProps } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import cn from 'classnames';

import { MaxFileSizeExceededError } from './upload-avatar.errors';
import styles from './upload-avatar.module.less';

type UploadInfo<T = unknown> = UploadChangeParam<UploadFile<T>>;

type UploadAvatarResponse = {
    name: string;
    url: string;
};

export type UploadAvatarFile = Omit<UploadFile<UploadAvatarResponse>, 'uid'>;

export type UploadAvatarProps = Omit<UploadProps, 'onChange'> & {
    fileType?: 'picture-card' | 'picture';
    onChange?(file: UploadAvatarFile): void;
    onError?(error: Error | MaxFileSizeExceededError): void;
    value?: UploadAvatarFile;
    maxSize?: number; // in MB
};

export const UploadAvatar = ({
    fileType = 'picture-card',
    value,
    maxSize,
    onError,
    onChange,
    ...props
}: UploadAvatarProps) => {
    const token = useAppSelector((state) => state.auth.token);
    const [fileList, setFileList] = useState<UploadInfo['fileList']>(
        value ? [value as UploadFile] : [],
    );

    const uploadStatus = fileList[0]?.status;

    const isLtMaxSize = (file: UploadFile) =>
        maxSize && file.size ? file.size / 1024 ** 2 < maxSize : true;

    const handleChange = (info: UploadInfo<UploadAvatarResponse>) => {
        const { file } = info;

        if (info.file.status === 'error') {
            setFileList([{ name: file.name, status: 'error' } as UploadFile]);
            onChange?.({ ...file, status: 'error' });
            onError?.(new Error('Something went wrong'));

            return;
        }

        if (!isLtMaxSize(file)) {
            const error = new MaxFileSizeExceededError();

            setFileList([{ name: file.name, status: 'error' } as UploadFile]);
            onChange?.({ ...file, status: 'error', error });
            onError?.(error);

            return;
        }

        onChange?.(file);
        setFileList(info.fileList);
    };

    const showUploadButton = !uploadStatus || uploadStatus === 'removed';

    return (
        <Upload
            accept='image/*'
            action={`${BACKEND_URL}/upload-image`}
            beforeUpload={isLtMaxSize}
            className={cn(styles.Upload, !showUploadButton && styles.UploadHidden)}
            fileList={fileList}
            headers={{ authorization: `Bearer ${token}` }}
            listType={fileType}
            locale={{ uploading: 'Загружаем' }}
            maxCount={1}
            name='file'
            onChange={handleChange}
            onRemove={() => setFileList([])}
            type='select'
            withCredentials={true}
            {...props}
        >
            {fileType === 'picture-card' ? (
                <div>
                    <PlusOutlined />
                    <Typography.Paragraph className={styles.UploadButtonPara} type='secondary'>
                        Загрузить фото профиля
                    </Typography.Paragraph>
                </div>
            ) : (
                <Row align='middle' justify='space-between' style={{ width: '100%' }}>
                    <Typography.Text style={{ fontSize: 12 }}>
                        Загрузить фото профиля:
                    </Typography.Text>
                    <Button icon={<UploadOutlined />} size='large' style={{ fontSize: 14 }}>
                        Загрузить
                    </Button>
                </Row>
            )}
        </Upload>
    );
};
