import { DirectionsActions } from "@/actions/directions";
import { Context } from "@/components/Context";
import { Direction } from "@/types/direction";
import { Place } from "@/types/map";
import { formatAddress } from "@/utils/formatting";
import { useContext, useEffect, useState } from "react";
import Sheet from "react-modal-sheet";
import { NativeAppButton } from "./NativeAppButton";

interface Props {
    place?: Place;
    onClose?: () => void;
}

export const PlaceDetail: React.FC<Props> = ({ place, onClose }) => {
    const { currentLocation } = useContext(Context);

    const [isOpened, setIsOpened] = useState<boolean>(!!place);
    const [direction, setDirection] = useState<Direction | undefined>();

    const addressFormatted = formatAddress(place?.address);

    useEffect(() => {
        if (place) {
            setIsOpened(true);
        }
    }, [place]);

    useEffect(() => {
        if (!isOpened) {
            onClose?.();
        }
    }, [isOpened]);

    useEffect(() => {
        setDirection(undefined);

        if (currentLocation && place) {
            DirectionsActions.get(currentLocation, place.coordinates).then(
                setDirection
            );
        }
    }, [place?.coordinates, currentLocation]);

    return (
        <Sheet
            initialSnap={1}
            snapPoints={[600, 400, 0]}
            className="md:w-[600px] md:ml-5"
            isOpen={isOpened}
            onClose={() => setIsOpened(false)}
        >
            <Sheet.Container
                style={{ backgroundColor: "" }}
                className="theme-page-background"
            >
                <Sheet.Header />

                <Sheet.Content className="p-5 pt-0 -mt-5">
                    {place && (
                        <>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-3xl font-medium">
                                    {place.name}
                                </h3>

                                <p>
                                    {direction &&
                                        `${direction.distance} km (${direction.duration})`}
                                </p>
                            </div>

                            <p className="mb-3">{place.description}</p>

                            {addressFormatted && (
                                <p className="mb-3">
                                    Address: {addressFormatted}
                                </p>
                            )}

                            <NativeAppButton coordinates={place.coordinates} />
                        </>
                    )}
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    );
};
