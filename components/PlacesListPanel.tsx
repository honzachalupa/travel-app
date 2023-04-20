import { Place } from "@/types/map";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Sheet from "react-modal-sheet";
import { PlaceDetailContent } from "./PlaceDetailContent";

interface Props {
    places: Place[];
    onPlaceSelected: (placeId: Place["id"]) => void;
    onClose?: () => void;
}

export interface PlacesListPanelRefProps {
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const PlacesListPanel = forwardRef(
    ({ places, onPlaceSelected, onClose }: Props, ref) => {
        const [isOpened, setIsOpened] = useState<boolean>(false);

        useEffect(() => {
            if (!isOpened) {
                onClose?.();
            }
        }, [isOpened]);

        useImperativeHandle(
            ref,
            (): PlacesListPanelRefProps => ({
                open: () => setIsOpened(true),
                close: () => setIsOpened(false),
                toggle: () => setIsOpened((prevState) => !prevState),
            })
        );

        return (
            <Sheet
                initialSnap={0}
                snapPoints={[-70, 0]}
                className="md:w-[600px] md:ml-5"
                isOpen={isOpened}
                onClose={() => setIsOpened(false)}
            >
                <Sheet.Container
                    style={{ backgroundColor: "" }}
                    className="theme-page-background !rounded-2xl"
                >
                    <Sheet.Header />

                    <Sheet.Content className="p-5 pt-0 -mt-5">
                        {places.map((place) => (
                            <PlaceDetailContent
                                key={place.id}
                                place={place}
                                onClick={() => onPlaceSelected(place.id)}
                            />
                        ))}
                    </Sheet.Content>
                </Sheet.Container>
            </Sheet>
        );
    }
);

PlacesListPanel.displayName = "PlacesListPanel";
