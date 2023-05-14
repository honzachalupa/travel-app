import { IPlace } from "@/types/map";
import { mapPlace, PlaceDB, resolveAdminApiUrl } from "@/utils/api";

const get = (): Promise<IPlace[]> =>
    fetch(resolveAdminApiUrl("/api/travel-app/places"), {
        method: "GET",
    }).then(async (response) => {
        const data: PlaceDB[] = await response.json();

        return data.map(mapPlace);
    });

export const PlacesActions = {
    get,
};
