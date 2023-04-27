import { Coordinates } from "@/components/Map/Map.types";

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
