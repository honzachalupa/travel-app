import { Place } from "@/types/map";
import { mapPlace, PlaceDB } from "@/utils/api";
import { supabase } from "@/utils/supabase";

const get = async (): Promise<Place[]> =>
    supabase
        .from("places")
        .select("*")
        .then(({ data }) => data!.map((place) => mapPlace(place as PlaceDB)));

export const PlacesActions = {
    get,
};
