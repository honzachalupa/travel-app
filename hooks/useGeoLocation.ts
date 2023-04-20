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
        let watch: number;

        if (navigator.geolocation) {
            watch = navigator.geolocation.watchPosition(
                onCurrentPositionChanged
            );
        } else {
            // TODO
        }

        return () => {
            if (watch) {
                navigator.geolocation.clearWatch(watch);
            }
        };
    }, []);

    return coordinates;
};
