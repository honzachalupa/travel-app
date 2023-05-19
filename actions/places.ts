import { IPlace, IPlaceRecord } from "@/types/map";
import { callAPI, mapPlace } from "@/utils/api";

const get = (): Promise<IPlace[]> =>
    callAPI("GET", "/api/db/travel-app/places").then((data: IPlaceRecord[]) =>
        data.map(mapPlace)
    );

export const PlacesActions = {
    get,
};
