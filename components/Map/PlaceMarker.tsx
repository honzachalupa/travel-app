import { PlacesContext } from "@/contexts/Places";
import { MarkerDefaultIcon, MarkerStarIcon, PointIcon } from "@/icons";
import { IPlace } from "@/types/map";
import cx from "classnames";
import { useContext } from "react";
import { Marker } from "react-map-gl";
import { IMarker } from "./Map.core";

interface IProps {
    data: IMarker["data"];
    currentZoom: number;
    isSelected: boolean;
    isFaded: boolean;
    onClick?: (id: IPlace["id"]) => void;
}

export const PlaceMarker: React.FC<IProps> = ({
    data: { id, name, coordinates },
    currentZoom,
    isSelected,
    isFaded,
    onClick,
}) => {
    const { isPlaceVisited } = useContext(PlacesContext);

    const isZoomedOut = currentZoom < 6;
    const isZoomedOutName = currentZoom > 11;
    const isVisited = isPlaceVisited(id);

    const MarkerIcon = isVisited ? MarkerStarIcon : MarkerDefaultIcon;

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
                    onClick?.(id);
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
