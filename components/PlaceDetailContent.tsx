import { DirectionActions } from "@/actions/direction";
import { Direction } from "@/types/direction";
import { Place, PlaceTypes } from "@/types/map";
import { formatAddress } from "@/utils/formatting";
import cx from "classnames";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Context } from "./Context";
import { Coordinates } from "./Map/Map.types";

interface Props {
    place: Place;
    className?: string;
    onClick?: () => void;
}

const Pil: React.FC<{ children: ReactNode; isGrayscale?: boolean }> = ({
    children,
    isGrayscale,
}) =>
    children ? (
        <p
            className={cx(
                "theme-background text-xs md:text-lg rounded-full inline-block px-2 py-1 md:px-4 mr-1 mb-1 last:mr-0",
                {
                    "accent-foreground": !isGrayscale,
                    "theme-foreground-faded": isGrayscale,
                }
            )}
        >
            {children}
        </p>
    ) : null;

export const PlaceDetailContent: React.FC<Props> = ({
    place,
    className,
    onClick,
}) => {
    const { currentLocation } = useContext(Context);

    const [direction, setDirection] = useState<Direction | null>();

    const addressFormatted = formatAddress(place);

    useEffect(() => {
        setDirection(undefined);

        if (currentLocation.latitude && currentLocation.longitude && place) {
            DirectionActions.get(
                currentLocation as Coordinates,
                place.coordinates
            ).then(setDirection);
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
            </div>

            <p className="opacity-75 lg:text-lg">{place.description}</p>

            {(place?.contact?.emailAddress ||
                place?.contact?.phoneNumber ||
                place?.contact?.url) && (
                <>
                    <h3 className="mt-5 text-sm md:text-lg text-opacity-80">
                        Kontakty
                    </h3>

                    <div className="mt-2">
                        <Pil isGrayscale>
                            {place?.contact?.url && (
                                <a href={place.contact.url} target="_blank">
                                    {place.contact.url}
                                </a>
                            )}
                        </Pil>

                        <Pil isGrayscale>
                            {place?.contact?.emailAddress && (
                                <a
                                    href={`mailto:${place.contact.emailAddress}`}
                                >
                                    {place.contact.emailAddress}
                                </a>
                            )}
                        </Pil>

                        <Pil isGrayscale>
                            {place?.contact?.phoneNumber && (
                                <a href={`tel:${place.contact.phoneNumber}`}>
                                    {place.contact.phoneNumber}
                                </a>
                            )}
                        </Pil>
                    </div>
                </>
            )}
        </div>
    );
};
