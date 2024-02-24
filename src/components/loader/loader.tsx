import Lottie, { LottieProps } from 'react-lottie';
import animationData from '@assets/lottie/loader.json';

type LoaderProps = Partial<LottieProps>;

export const Loader = ({ options, ...rest }: LoaderProps) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
        ...options,
    };
    return (
        <div data-test-id='loader'>
            <Lottie options={defaultOptions} width={150} height={150} {...rest} />
        </div>
    );
};
