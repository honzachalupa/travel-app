import {
    forwardRef,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import Sheet from "react-modal-sheet";

interface IProps {
    initialSnapPointIndex?: number;
    snapPoints?: number[];
    className?: string;
    children: ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
}

export interface IModalSheetRefProps {
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpened: boolean;
}

export const ModalSheet = forwardRef(
    (
        {
            initialSnapPointIndex,
            snapPoints,
            className,
            children,
            onOpen,
            onClose,
        }: IProps,
        ref
    ) => {
        const [isOpened, setIsOpened] = useState<boolean>(false);

        useEffect(() => {
            if (isOpened) {
                onOpen?.();
            } else {
                onClose?.();
            }
        }, [isOpened]);

        useImperativeHandle(
            ref,
            (): IModalSheetRefProps => ({
                open: () => setIsOpened(true),
                close: () => setIsOpened(false),
                toggle: () => setIsOpened((prevState) => !prevState),
                isOpened,
            }),
            [isOpened]
        );

        return (
            <Sheet
                initialSnap={
                    initialSnapPointIndex !== undefined
                        ? initialSnapPointIndex
                        : 1
                }
                snapPoints={snapPoints || [-70, 0.5, 0]}
                className={className}
                isOpen={isOpened}
                onClose={() => setIsOpened(false)}
            >
                <Sheet.Container
                    style={{ backgroundColor: "" }}
                    className="theme-page-background bg-opacity-20 backdrop-blur-lg !rounded-2xl"
                >
                    <Sheet.Header className="z-10" />

                    <Sheet.Content className="p-5 pt-0 -mt-6">
                        <div className="overflow-scroll w-full h-full">
                            {children}
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
            </Sheet>
        );
    }
);
