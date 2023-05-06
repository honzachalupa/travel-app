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
    isContactInfoShown?: boolean;
    isVisitedStatusShown?: boolean;
    isDisclaimerShown?: boolean;
    onClick?: () => void;
}

const Pil: React.FC<{
    children: ReactNode;
    color?: "gray" | "green";
    className?: string;
}> = ({ children, color, className }) =>
    children ? (
        <p
            className={cx(
                "theme-background accent-foreground text-xs md:text-lg rounded-full inline-block px-2 py-1 md:px-4 mr-1 mb-1 last:mr-0",
                {
                    "bg-green-600 text-white": color === "green",
                    "theme-foreground-faded": color === "gray",
                },
                className
            )}
        >
            {children}
        </p>
    ) : null;

export const PlaceDetailContent: React.FC<Props> = ({
    place,
    className,
    isContactInfoShown,
    isVisitedStatusShown,
    isDisclaimerShown,
    onClick,
}) => {
    const { user, currentLocation } = useContext(Context);

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

            <p className="opacity-75 lg:text-lg text-justify">
                {place.description}
            </p>

            {((isContactInfoShown && place?.contact?.emailAddress) ||
                place?.contact?.phoneNumber ||
                place?.contact?.url) && (
                <div className="mt-3">
                    <Pil color="gray">
                        {place?.contact?.url && (
                            <a href={place.contact.url} target="_blank">
                                {place.contact.url}
                            </a>
                        )}
                    </Pil>

                    <Pil color="gray">
                        {place?.contact?.instagramUrl && (
                            <a
                                href={place.contact.instagramUrl}
                                target="_blank"
                            >
                                @{place.contact.instagramUrl}
                            </a>
                        )}
                    </Pil>

                    <Pil color="gray">
                        {place?.contact?.emailAddress && (
                            <a href={`mailto:${place.contact.emailAddress}`}>
                                {place.contact.emailAddress}
                            </a>
                        )}
                    </Pil>

                    <Pil color="gray">
                        {place?.contact?.phoneNumber && (
                            <a href={`tel:${place.contact.phoneNumber}`}>
                                {place.contact.phoneNumber}
                            </a>
                        )}
                    </Pil>
                </div>
            )}

            {isVisitedStatusShown &&
                user?.visitedPlaceIds.includes(place.id) && (
                    <Pil color="green" className="mt-3">
                        Navštíveno
                    </Pil>
                )}

            {isDisclaimerShown && (
                <p className="text-xs text-opacity-30 text-justify mt-5">
                    Upozornění: Údaje uvedené v aplikaci byly nalezeny umělou
                    inteligencí - je proto možné, že nebudou zcela správné. Než
                    vyrazíte na výlet, údaje si raději ověřte (zejména kontaktní
                    údaje).
                </p>
            )}
        </div>
    );
};
