import { useParams } from 'react-router-dom';
import { Button, Result } from 'antd';
import { ResultConfig, resultConfigs } from './result-config';
import { Card } from '@components/card';
import styles from './auth-result-page.module.less';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { redirectFromAuthResult } from '@redux/auth';
import type { ResultStatus } from 'src/types';

type ResultTemplateProps = {
    config: ResultConfig;
    redirect: () => void;
};

const ResultTemplate = ({ config, redirect }: ResultTemplateProps) => (
    <Result
        className={styles.Result}
        status={config.status}
        title={config.title}
        subTitle={config.subTitle}
        extra={
            <Button block type='primary' size='large' onClick={redirect}>
                {config.buttonText}
            </Button>
        }
    />
);

export const AuthResultPage = () => {
    const { status } = useParams<{ status: ResultStatus }>();
    const dispatch = useAppDispatch();

    const config = resultConfigs[status as ResultStatus];
    const redirect = () => dispatch(redirectFromAuthResult(status as ResultStatus));

    return (
        <Card className={styles.Card}>
            <ResultTemplate redirect={redirect} config={config} />
        </Card>
    );
};
