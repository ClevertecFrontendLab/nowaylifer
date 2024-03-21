import {
    ComponentType,
    createContext,
    Fragment,
    PropsWithChildren,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { ServerErrorModal } from '@components/server-error-modal';
import { ModalProps } from 'antd';

type AppModalContext = {
    serverError(props?: ModalProps): void;
    close(): void;
};

export const AppModalContext = createContext<AppModalContext | null>(null);

export const AppModalProvider = (props: PropsWithChildren) => {
    const [showModal, setShowModal] = useState(false);
    const [ModalComponent, setModalComponent] = useState<ComponentType<ModalProps> | null>(null);

    const closeModal = useCallback(() => setShowModal(false), []);

    const createModal = (component: ComponentType<ModalProps>) => {
        setShowModal(true);
        setModalComponent(() => component);
    };

    const context: AppModalContext = useMemo(
        () => ({
            close: () => setShowModal(false),
            serverError: (additionalProps) =>
                createModal((modalProps) => (
                    <ServerErrorModal onCancel={closeModal} {...modalProps} {...additionalProps} />
                )),
        }),
        [closeModal],
    );

    return (
        <Fragment>
            {ModalComponent && <ModalComponent open={showModal} />}
            <AppModalContext.Provider value={context} {...props} />
        </Fragment>
    );
};
