import { Coordinates } from "@/components/Map/Map.types";
import { IPlace, TNavigationAppId } from "@/types/map";

export const getAirDistance = (
    currentLocation: Coordinates,
    { longitude, latitude }: Coordinates
) => {
    const toRadians = (value: number) => (value * Math.PI) / 180;

    const R = 6371.071;
    const rlat1 = toRadians(latitude);
    const rlat2 = toRadians(currentLocation.latitude);
    const difflat = rlat2 - rlat1;
    const difflon = toRadians(currentLocation.longitude - longitude);

    return (
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) *
                        Math.cos(rlat2) *
                        Math.sin(difflon / 2) *
                        Math.sin(difflon / 2)
            )
        )
    );
};

export const resolveNavigationUrl = (
    appId: TNavigationAppId,
    address: IPlace["address"],
    coordinates: Coordinates
) => {
    switch (appId) {
        case "apple-maps":
            return `http://maps.apple.com/?sll=${coordinates.latitude},${coordinates.longitude}`;
        case "google-maps":
            return `https://maps.google.com/?q=${coordinates.latitude},${coordinates.longitude}`;
        case "waze":
            return `https://waze.com/ul?ll=${coordinates.latitude},${coordinates.longitude}`;
        case "mapy-cz":
            return `https://mapy.cz/zakladni?x=${coordinates.longitude}&y=${coordinates.latitude}&z=18`;
        default:
            break;
    }
};
