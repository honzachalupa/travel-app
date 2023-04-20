import { Coordinates } from "@/components/Map/Map.types";
import config from "@/config";
import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useGeoLocation = () => {
    const [coordinates, setCoordinates] = useLocalStorage<Coordinates>(
        "currentLocation",
        config.defaultLocation
    );

    const onCurrentPositionChanged = ({ coords }: GeolocationPosition) => {
        setCoordinates({
            longitude: coords.longitude,
            latitude: coords.latitude,
        });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onCurrentPositionChanged);
        } else {
            // TODO
        }
    }, []);

    return coordinates;
};
