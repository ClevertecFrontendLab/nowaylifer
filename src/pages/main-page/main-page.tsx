import { PageLayout } from '@components/page-layout';

import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';

export const MainPage = () => (
    <PageLayout>
        <Header />
        <Main />
        <Footer />
    </PageLayout>
);
