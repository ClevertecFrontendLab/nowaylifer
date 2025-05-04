import { Navigate, Outlet } from 'react-router';

import { useActiveCategories } from '~/entities/category';

export const NavigateToSubCategory = () => {
    const [rootCategory, subCategory] = useActiveCategories();
    if (subCategory) return <Outlet />;
    const firstSubCategory = rootCategory!.subCategories[0];
    return <Navigate to={`/${rootCategory!.category}/${firstSubCategory.category}`} />;
};
