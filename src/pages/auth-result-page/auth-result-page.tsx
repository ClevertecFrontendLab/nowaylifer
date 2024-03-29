import { Card } from '@components/card';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { ResultStatus, redirectFromAuthResult } from '@redux/auth';
import { Button, Result } from 'antd';
import invariant from 'invariant';
import { useParams } from 'react-router-dom';
import styles from './auth-result-page.module.less';
import { ResultConfig, buttonTestIdMap, resultConfigs } from './result-config';

type ResultTemplateProps = {
    config: ResultConfig;
    redirect: () => void;
    buttonTestId?: string;
};

const ResultTemplate = ({ config, redirect, buttonTestId }: ResultTemplateProps) => (
    <Result
        className={styles.Result}
        status={config.status}
        title={config.title}
        subTitle={config.subTitle}
        extra={
            <Button
                block
                type='primary'
                size='large'
                onClick={redirect}
                data-test-id={buttonTestId}
            >
                {config.buttonText}
            </Button>
        }
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
                redirect={redirect}
                config={config}
                buttonTestId={buttonTestIdMap[status]}
            />
        </Card>
    );
};
