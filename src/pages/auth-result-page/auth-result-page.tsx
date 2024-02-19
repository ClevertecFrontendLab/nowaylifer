import { useNavigate, useParams } from 'react-router-dom';
import { Button, Result } from 'antd';
import { ResultConfig, resultConfigs, type ResultStatus } from './result-config';
import { useAppLocation } from '@hooks/use-app-location';
import { Card } from '@components/card';
import styles from './auth-result-page.module.less';

type ResultTemplateProps = {
    config: ResultConfig;
    redirect: (to: string) => void;
};

const ResultTemplate = ({ config, redirect }: ResultTemplateProps) => (
    <Result
        className={styles.Result}
        status={config.status}
        title={config.title}
        subTitle={config.subTitle}
        extra={
            <Button block type='primary' size='large' onClick={() => redirect(config.redirectTo)}>
                {config.buttonText}
            </Button>
        }
    />
);

export const AuthResultPage = () => {
    const { status } = useParams();
    const location = useAppLocation();
    const navigate = useNavigate();

    const redirect = (to: string) =>
        navigate(to, {
            replace: true,
            state: {
                ...location.state,
                // getting initial "from" location
                from: location.state?.from?.state.from,
            },
        });

    const config = resultConfigs[status as ResultStatus];

    return (
        <Card className={styles.Card}>
            <ResultTemplate redirect={redirect} config={config} />
        </Card>
    );
};
