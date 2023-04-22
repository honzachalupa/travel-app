import { MoreIcon } from "@/icons";
import { Place } from "@/types/map";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { ContextMenu } from "./ContextMenu";
import { ModalSheet, ModalSheetRefProps } from "./ModalSheet";
import { PlaceDetailContent } from "./PlaceDetailContent";

interface Props {
    place?: Place;
    onClose: () => void;
}

export interface PlaceDetailPanelRefProps {
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpened: boolean | undefined;
}

export const PlaceDetailPanel = forwardRef(({ place, onClose }: Props, ref) => {
    const modalSheetRef = useRef<ModalSheetRefProps>();

    useEffect(() => {
        if (place) {
            modalSheetRef.current?.open();
        }
    }, [place]);

    useImperativeHandle(
        ref,
        (): PlaceDetailPanelRefProps => ({
            open: () => modalSheetRef.current?.open(),
            close: () => modalSheetRef.current?.close(),
            toggle: () => modalSheetRef.current?.toggle(),
            isOpened: modalSheetRef.current?.isOpened,
        }),
        [modalSheetRef.current?.isOpened]
    );

    // console.log(2, { isOpened: modalSheetRef.current?.isOpened });

    return (
        <>
            <ModalSheet
                ref={modalSheetRef}
                snapPoints={[600, 400, 0]}
                className="md:w-[600px] md:ml-5"
                onClose={onClose}
            >
                {place && (
                    <PlaceDetailContent place={place} isAllDetailsShown />
                )}
            </ModalSheet>

            {place && (
                <ContextMenu
                    title="Možnosti"
                    items={[
                        {
                            label: "Označit jako navštívené",
                            onClick: () => {},
                        },
                        {
                            label: "Upravit",
                            onClick: () => {},
                        },
                        {
                            label: "Navigovat",
                            onClick: () => {},
                        },
                    ]}
                    itemsPosition={{
                        x: "left",
                        y: "top",
                    }}
                    zIndex={99999999}
                    className="absolute right-5 bottom-5"
                >
                    <MoreIcon className="w-full h-full p-3 accent-foreground" />
                </ContextMenu>
            )}
        </>
    );
});

PlaceDetailPanel.displayName = "PlaceDetailPanel";
