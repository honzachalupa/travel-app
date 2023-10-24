import { IPlace, IPlaceRecord } from "@/types/map";
import { callAPI, mapPlace } from "@/utils/api";
import {
    removeDuplicates,
    sortAlphabetically,
} from "@honzachalupa/design-system";

const get = (): Promise<IPlace[]> =>
    callAPI("GET", "/api/db/travel-app/places").then((data: IPlaceRecord[]) =>
        data.map(mapPlace)
    );

const getCountries = (): Promise<string[]> =>
    callAPI("GET", "/api/db/travel-app/places").then((data: IPlaceRecord[]) => {
        const countries = data
            .map(mapPlace)
            .map((place) => place.address?.country)
            .filter(Boolean) as string[];

        return sortAlphabetically(removeDuplicates(countries));
    });

export const PlacesActions = {
    get,
    getCountries,
};
