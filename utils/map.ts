import { Coordinates } from "@/components/Map/Map.types";
import { NavigationAppId, Place } from "@/types/map";

export const resolveNavigationUrl = (
    appId: NavigationAppId,
    address: Place["address"],
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
