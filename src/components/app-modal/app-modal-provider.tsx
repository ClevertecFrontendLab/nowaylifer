import { ServerErrorModal } from '@components/server-error-modal';
import { ModalProps } from 'antd';
import {
    ComponentType,
    createContext,
    PropsWithChildren,
    useCallback,
    useMemo,
    useState,
} from 'react';

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
                createModal(
                    (props) =>
                        console.log(additionalProps) || (
                            <ServerErrorModal
                                onCancel={closeModal}
                                {...props}
                                {...additionalProps}
                            />
                        ),
                ),
        }),
        [closeModal],
    );

    return (
        <>
            {ModalComponent && <ModalComponent open={showModal} />}
            <AppModalContext.Provider value={context} {...props} />
        </>
    );
};
