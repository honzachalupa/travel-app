import { Place } from "@/types/map";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
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
        })
    );

    return (
        <ModalSheet
            ref={modalSheetRef}
            snapPoints={[600, 400, 0]}
            className="md:w-[600px] md:ml-5"
            onClose={onClose}
        >
            {place && <PlaceDetailContent place={place} isAllDetailsShown />}
        </ModalSheet>
    );
});

PlaceDetailPanel.displayName = "PlaceDetailPanel";
