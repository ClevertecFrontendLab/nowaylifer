import { useParams } from 'react-router-dom';
import { Card } from '@components/card';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { redirectFromAuthResult, ResultStatus } from '@redux/auth';
import { Button, Result } from 'antd';
import invariant from 'invariant';

import styles from './auth-result-page.module.less';
import { buttonTestIdMap, ResultConfig, resultConfigs } from './result-config';

type ResultTemplateProps = {
    config: ResultConfig;
    redirect: () => void;
    buttonTestId?: string;
};

const ResultTemplate = ({ config, redirect, buttonTestId }: ResultTemplateProps) => (
    <Result
        className={styles.Result}
        extra={
            <Button
                block={true}
                data-test-id={buttonTestId}
                onClick={redirect}
                size='large'
                type='primary'
            >
                {config.buttonText}
            </Button>
        }
        status={config.status}
        subTitle={config.subTitle}
        title={config.title}
    />
);

export const AuthResultPage = () => {
    const { status } = useParams<{ status: ResultStatus }>();
    const dispatch = useAppDispatch();

    invariant(status, 'Result status is undefined');
    invariant(status in resultConfigs, 'Unknown result status');

    const config = resultConfigs[status];
    const redirect = () => dispatch(redirectFromAuthResult(status));

    return (
        <Card className={styles.Card}>
            <ResultTemplate
                buttonTestId={buttonTestIdMap[status]}
                config={config}
                redirect={redirect}
            />
        </Card>
    );
};
