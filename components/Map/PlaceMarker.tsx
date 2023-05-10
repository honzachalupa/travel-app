import { MarkerDefaultIcon, MarkerStarIcon, PointIcon } from "@/icons";
import { IPlace } from "@/types/map";
import cx from "classnames";
import { Marker } from "react-map-gl";

interface IProps {
    place: IPlace;
    zoom: number;
    isSelected: boolean;
    isVisited: boolean;
    isFaded: boolean;
    onClick?: (id: IPlace["id"]) => void;
}

export const PlaceMarker: React.FC<IProps> = ({
    place: { id, name, coordinates },
    zoom,
    isSelected,
    isVisited,
    isFaded,
    onClick,
}) => {
    const isZoomedOut = zoom < 6;
    const isZoomedOutName = zoom > 11;

    const MarkerIcon = isVisited ? MarkerStarIcon : MarkerDefaultIcon;

    const handlePlaceClick = (id: IPlace["id"]) => {
        onClick?.(id);
    };

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
                        className={cx("w-2 aspect-square transition-all", {
                            "fill-green-600": isVisited,
                            "accent-foreground": !isVisited,
                            "opacity-30": isFaded && !isSelected,
                        })}
                    />
                ) : (
                    <MarkerIcon
                        className={cx("aspect-square transition-all", {
                            "w-6 fill-green-600": isVisited,
                            "w-8 accent-foreground": !isVisited,
                            "opacity-30": isFaded && !isSelected,
                        })}
                        style={{
                            filter: "drop-shadow(0 0 1px rgb(0 0 0 / 0.5))",
                        }}
                    />
                )}

                {name && isZoomedOutName && (
                    <p className="opacity-75">{name}</p>
                )}
            </div>
        </Marker>
    );
};
