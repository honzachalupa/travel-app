import { DirectionActions } from "@/actions/direction";
import { Direction } from "@/types/direction";
import { Place, PlaceTypes } from "@/types/map";
import { formatAddress } from "@/utils/formatting";
import { useGeoLocation } from "@honzachalupa/design-system";
import { ReactNode, useEffect, useState } from "react";

interface Props {
    place: Place;
    className?: string;
    onClick?: () => void;
}

const Pil: React.FC<{ children: ReactNode }> = ({ children }) =>
    children ? (
        <p className="theme-background accent-foreground text-xs rounded-full inline-block px-2 py-1 mr-1 mb-1 last:mr-0">
            {children}
        </p>
    ) : null;

export const PlaceDetailContent: React.FC<Props> = ({
    place,
    className,
    onClick,
}) => {
    const currentLocation = useGeoLocation();

    const [direction, setDirection] = useState<Direction | null>();

    const addressFormatted = formatAddress(place);

    useEffect(() => {
        setDirection(undefined);

        if (currentLocation && place) {
            DirectionActions.get(currentLocation, place.coordinates).then(
                setDirection
            );
        }
    }, [place?.coordinates]);

    return (
        <div className={className} onClick={onClick}>
            <h3 className="text-3xl font-medium my-3">{place.name}</h3>

            <div className="mb-2">
                <Pil>{place?.type && PlaceTypes[place.type]}</Pil>

                <Pil>{addressFormatted}</Pil>

                <Pil>
                    Vzdálenost:{" "}
                    {direction
                        ? `${direction.distance} km (${direction.duration})`
                        : "Počítám..."}
                </Pil>

                <Pil>
                    {place?.contact?.url && (
                        <a
                            href={place?.contact?.url}
                            target="_blank"
                            className=" underline"
                        >
                            Web
                        </a>
                    )}
                </Pil>
            </div>

            <p className="opacity-75 lg:text-lg">{place.description}</p>
        </div>
    );
};
