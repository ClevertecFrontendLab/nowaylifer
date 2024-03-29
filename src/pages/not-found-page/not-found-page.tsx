import { useNavigate } from 'react-router-dom';
import { PageContent } from '@components/page-content';
import { PageContentCard } from '@components/page-content-card';
import { PageLayout } from '@components/page-layout';
import { RoutePath } from '@router/paths';
import { Button, Result, Typography } from 'antd';

import styles from './not-found-page.module.less';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <PageLayout>
            <PageContent className={styles.PageContent}>
                <PageContentCard className={styles.ContentCard}>
                    <Result
                        extra={
                            <Button
                                onClick={() => navigate(RoutePath.Main)}
                                size='large'
                                style={{ fontSize: 14 }}
                                type='primary'
                            >
                                На главную
                            </Button>
                        }
                        status='404'
                        subTitle={
                            <Typography.Paragraph
                                style={{ color: 'var(--character-light-secondary-45)' }}
                            >
                                Извините, страница не найдена, возможно, она была удалена или
                                перемещена.
                            </Typography.Paragraph>
                        }
                        title={
                            <Typography.Text style={{ fontWeight: 500 }}>
                                Такой страницы нет
                            </Typography.Text>
                        }
                    />
                </PageContentCard>
            </PageContent>
        </PageLayout>
    );
};
