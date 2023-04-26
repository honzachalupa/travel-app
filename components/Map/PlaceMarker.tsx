import { MarkerDefaultIcon, MarkerStarIcon, PointIcon } from "@/icons";
import { Place } from "@/types/map";
import cx from "classnames";
import { Marker } from "react-map-gl";

interface Props {
    place: Place;
    zoom: number;
    isSelected: boolean;
    isVisited: boolean;
    isFaded: boolean;
    onClick?: (id: Place["id"]) => void;
}

export const PlaceMarker: React.FC<Props> = ({
    place: { id, name, coordinates },
    zoom,
    isSelected,
    isVisited,
    isFaded,
    onClick,
}) => {
    const MarkerIcon = isVisited ? MarkerStarIcon : MarkerDefaultIcon;

    const handlePlaceClick = (id: Place["id"]) => {
        onClick?.(id);
    };

    const isZoomedOut = zoom < 6;

    console.log({ zoom, isZoomedOut });

    return (
        <Marker
            key={id}
            longitude={coordinates.longitude}
            latitude={coordinates.latitude}
        >
            <div
                className={cx("flex flex-col items-center", {
                    "relative -top-4": !isZoomedOut,
                    "cursor-pointer": !!onClick,
                })}
                onClick={() => {
                    handlePlaceClick(id);
                }}
            >
                {isZoomedOut ? (
                    <PointIcon
                        className={cx(
                            "w-2 aspect-square accent-foreground transition-all",
                            {
                                "opacity-30":
                                    (isVisited || isFaded) && !isSelected,
                            }
                        )}
                    />
                ) : (
                    <MarkerIcon
                        className={cx(
                            "w-8 aspect-square accent-foreground transition-all",
                            {
                                "w-6": isVisited,
                                "opacity-30":
                                    (isVisited || isFaded) && !isSelected,
                            }
                        )}
                        style={{
                            filter: "drop-shadow(0 0 1px rgb(0 0 0 / 0.5))",
                        }}
                    />
                )}

                {name && zoom > 8 && <p className="opacity-75">{name}</p>}
            </div>
        </Marker>
    );
};
