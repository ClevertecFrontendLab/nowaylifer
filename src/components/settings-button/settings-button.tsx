import { SettingOutlined } from '@ant-design/icons';
import { useBreakpoint } from '@hooks/use-breakpoint';
import { Button, ButtonProps } from 'antd';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

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
    }

    if (breakpoint.md) {
        return variant.md;
    }

    return variant.sm;
};

export const SettingsButton = (props: ButtonProps) => {
    const breakpoint = useBreakpoint();

    return <Button {...getVariant(breakpoint)} {...props} />;
};
