import { MarkerIcon, MarkerStarIcon } from "@/icons";
import { Place } from "@/types/map";
import cx from "classnames";
import { Marker } from "react-map-gl";

interface Props {
    place: Place;
    zoom: number;
    isFaded: boolean;
    onClick?: (id: Place["id"]) => void;
}

export const PlaceMarker: React.FC<Props> = ({
    place: { id, name, coordinates },
    zoom,
    isFaded,
    onClick,
}) => {
    const isVisited = false;

    const Icon = isVisited ? MarkerStarIcon : MarkerIcon;

    const handlePlaceClick = (id: Place["id"]) => {
        onClick?.(id);
    };

    return (
        <Marker
            key={id}
            longitude={coordinates.longitude}
            latitude={coordinates.latitude}
        >
            <div
                className={cx("flex flex-col items-center relative -top-4", {
                    "cursor-pointer": !!onClick,
                })}
                onClick={() => {
                    handlePlaceClick(id);
                }}
            >
                <Icon
                    className={cx(
                        "w-10 h-10 accent-foreground aspect-square transition-all",
                        {
                            "opacity-20": isFaded,
                        }
                    )}
                    style={{
                        filter: "drop-shadow(0 0 1px rgb(0 0 0 / 0.5))",
                    }}
                />

                {name && zoom > 8 && <p>{name}</p>}
            </div>
        </Marker>
    );
};
