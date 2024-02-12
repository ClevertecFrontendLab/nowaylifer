import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import { Button, ButtonProps } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useBreakpoint } from '@hooks/use-breakpoint';

const getVariant = (breakpoint: ReturnType<typeof useBreakpoint>) => {
    const lg = {
        icon: <SettingOutlined />,
        type: 'text',
        shape: 'default',
        children: 'Настройки',
    } as const;

    const variant: Partial<Record<Breakpoint, ButtonProps>> = {
        lg,
        md: { ...lg, icon: undefined },
        sm: { ...lg, type: 'default', shape: 'circle', children: null },
    };

    if (breakpoint.lg) {
        return variant.lg;
    } else if (breakpoint.md) {
        return variant.md;
    } else {
        return variant.sm;
    }
};

export const SettingsButton = () => {
    const breakpoint = useBreakpoint();
    return <Button {...getVariant(breakpoint)} />;
};
