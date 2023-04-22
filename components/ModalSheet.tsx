import {
    forwardRef,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import Sheet from "react-modal-sheet";

interface Props {
    initialSnapPointIndex?: number;
    snapPoints?: number[];
    className?: string;
    children: ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
}

export interface ModalSheetRefProps {
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
        }: Props,
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
            (): ModalSheetRefProps => ({
                open: () => setIsOpened(true),
                close: () => setIsOpened(false),
                toggle: () => setIsOpened((prevState) => !prevState),
                isOpened,
            }),
            [isOpened]
        );

        // console.log(1, { isOpened });

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
                    <Sheet.Header />

                    <Sheet.Content className="p-5 pt-0 -mt-6">
                        <div className="overflow-scroll">{children}</div>
                    </Sheet.Content>
                </Sheet.Container>
            </Sheet>
        );
    }
);

ModalSheet.displayName = "ModalSheet";
