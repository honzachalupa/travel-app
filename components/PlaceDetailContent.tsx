import { DirectionsActions } from "@/actions/directions";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { Direction } from "@/types/direction";
import { Place } from "@/types/map";
import { formatAddress } from "@/utils/formatting";
import { useEffect, useState } from "react";
import { NativeAppButton } from "./NativeAppButton";

interface Props {
    place: Place;
    isAllDetailsShown?: boolean;
    onClick?: () => void;
}

export const PlaceDetailContent: React.FC<Props> = ({
    place,
    isAllDetailsShown,
    onClick,
}) => {
    const currentLocation = useGeoLocation();

    const [direction, setDirection] = useState<Direction | undefined>();

    const addressFormatted = formatAddress(place?.address);

    useEffect(() => {
        setDirection(undefined);

        if (currentLocation && place) {
            DirectionsActions.get(currentLocation, place.coordinates).then(
                setDirection
            );
        }
    }, [place?.coordinates, currentLocation]);

    return (
        <div onClick={onClick}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-3xl font-medium">{place.name}</h3>

                <p>
                    {direction &&
                        `${direction.distance} km (${direction.duration})`}
                </p>
            </div>

            <p className="mb-3">{place.description}</p>

            {isAllDetailsShown && (
                <>
                    {addressFormatted && (
                        <p className="mb-3">Address: {addressFormatted}</p>
                    )}

                    <NativeAppButton coordinates={place.coordinates} />
                </>
            )}
        </div>
    );
};
