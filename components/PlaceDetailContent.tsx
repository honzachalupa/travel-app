import { DirectionsActions } from "@/actions/directions";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { Direction } from "@/types/direction";
import { Place } from "@/types/map";
import { formatAddress } from "@/utils/formatting";
import { useEffect, useState } from "react";

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
            {direction && (
                <p className="opacity-60">
                    {direction.distance} km ({direction.duration})
                </p>
            )}

            <h3 className="text-3xl font-medium my-2">{place.name}</h3>

            <p className="mb-3 text-lg opacity-80">{place.description}</p>

            {isAllDetailsShown && addressFormatted && (
                <p className="mb-3 opacity-60">Address: {addressFormatted}</p>
            )}
        </div>
    );
};
