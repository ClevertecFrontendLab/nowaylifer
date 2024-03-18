import EmptySvg from '@assets/icons/empty.svg?react';

export const EmptyPlaceholder = () => (
    <div
        style={{
            paddingBlock: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <EmptySvg />
    </div>
);
