import { DirectionsActions } from "@/actions/directions";
import { Direction } from "@/types/direction";
import { Place, PlaceTypes } from "@/types/map";
import { formatAddress } from "@/utils/formatting";
import { useGeoLocation } from "@honzachalupa/design-system";
import { useEffect, useState } from "react";

interface Props {
    place: Place;
    className?: string;
    isAllDetailsShown?: boolean;
    onClick?: () => void;
}

const Pil: React.FC<{ value: string | undefined | null }> = ({ value }) =>
    value ? (
        <p className="theme-background accent-foreground text-xs rounded-full inline-block px-2 py-1 mr-1 mb-1 last:mr-0">
            {value}
        </p>
    ) : null;

export const PlaceDetailContent: React.FC<Props> = ({
    place,
    className,
    isAllDetailsShown,
    onClick,
}) => {
    const currentLocation = useGeoLocation();

    const [direction, setDirection] = useState<Direction | null>();

    const addressFormatted = formatAddress(place);

    useEffect(() => {
        setDirection(undefined);

        if (currentLocation && place) {
            DirectionsActions.get(currentLocation, place.coordinates).then(
                setDirection
            );
        }
    }, [place?.coordinates, currentLocation]);

    return (
        <div className={className} onClick={onClick}>
            <p className="min-h-[24px] opacity-60">
                {direction &&
                    `${direction.distance} km (${direction.duration})`}
            </p>

            <h3 className="text-3xl font-medium mt-2 mb-3">{place.name}</h3>

            {isAllDetailsShown && (
                <div className="mb-2">
                    <Pil value={place?.type && PlaceTypes[place.type]} />

                    <Pil value={addressFormatted} />

                    <Pil
                        value={`Vdzálenost: ${
                            direction
                                ? `${direction.distance} km (${direction.duration})`
                                : "Počítám..."
                        }`}
                    />
                </div>
            )}

            <p className="opacity-75 lg:text-lg">{place.description}</p>
        </div>
    );
};
