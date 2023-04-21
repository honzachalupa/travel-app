import { Place } from "@/types/map";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { ModalSheet, ModalSheetRefProps } from "./ModalSheet";
import { PlaceDetailContent } from "./PlaceDetailContent";

interface Props {
    places: Place[];
    onPlaceSelected: (placeId: Place["id"]) => void;
    onOpen: () => void;
}

export interface PlacesListPanelRefProps {
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const PlacesListPanel = forwardRef(
    ({ places, onPlaceSelected, onOpen }: Props, ref) => {
        const modalSheetRef = useRef<ModalSheetRefProps>();

        useImperativeHandle(
            ref,
            (): PlacesListPanelRefProps => ({
                open: () => modalSheetRef.current?.open(),
                close: () => modalSheetRef.current?.close(),
                toggle: () => modalSheetRef.current?.toggle(),
            }),
            []
        );

        return (
            <ModalSheet
                ref={modalSheetRef}
                initialSnapPointIndex={0}
                snapPoints={[-70, 0]}
                className="md:w-[600px] md:ml-5"
                onOpen={onOpen}
            >
                {places.map((place) => (
                    <PlaceDetailContent
                        key={place.id}
                        place={place}
                        onClick={() => onPlaceSelected(place.id)}
                    />
                ))}
            </ModalSheet>
        );
    }
);

PlacesListPanel.displayName = "PlacesListPanel";
