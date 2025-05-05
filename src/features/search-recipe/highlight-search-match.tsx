import { Highlight, HighlightProps } from '@chakra-ui/react';

export const HighlightSearchMatch = (props: HighlightProps) => (
    <Highlight styles={{ color: 'lime.600' }} {...props} />
);
