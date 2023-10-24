import { Direction } from "@/types/direction";
import { ICoordinates } from "@honzachalupa/design-system";
import moment from "moment";

const get = (coordinatesFrom: ICoordinates, coordinateTo: ICoordinates) => {
    const coordinatesList = [
        {
            longitude: coordinatesFrom.longitude,
            latitude: coordinatesFrom.latitude,
        },
        {
            longitude: coordinateTo.longitude,
            latitude: coordinateTo.latitude,
        },
    ]
        .map(({ longitude, latitude }) => `${longitude},${latitude}`)
        .join(";");

    return fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinatesList}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
    )
        .then((response) => response.json())
        .then(({ routes }): Direction | null => {
            const direction = routes[0];

            if (!direction) {
                throw new Error("No direction found");
            }

            return {
                distance: Math.round(routes[0].distance / 1000),
                duration: moment()
                    .startOf("day")
                    .seconds(routes[0].duration)
                    .format("H:mm"),
            };
        });
};

export const DirectionActions = {
    get,
};
