import { Place } from "@/types/map";
import { supabase } from "@/utils/supabase";

interface PlaceDB {
    id: string;
    name: string;
    description: string;
    coordinates_longitude: number;
    coordinates_latitude: number;
    address_street: string;
    address_houseNumber: number;
    address_city: string;
    address_country: string;
    contact_phoneNumber: string;
    contact_emailAddress: string;
    ownerId: string;
}

const mapPlace = ({
    id,
    name,
    description,
    coordinates_longitude,
    coordinates_latitude,
    address_street,
    address_houseNumber,
    address_city,
    address_country,
    contact_phoneNumber,
    contact_emailAddress,
    ownerId,
}: PlaceDB): Place => ({
    id,
    name,
    description,
    coordinates: {
        longitude: coordinates_longitude,
        latitude: coordinates_latitude,
    },
    address: {
        street: address_street,
        houseNumber: address_houseNumber,
        city: address_city,
        country: address_country,
    },
    contact: {
        phoneNumber: contact_phoneNumber,
        emailAddress: contact_emailAddress,
    },
    ownerId,
});

const get = async (params: {
    id?: Place["id"] | undefined;
}): Promise<Place[]> => {
    const query = supabase.from("places").select("*");

    if (params.id) {
        return query
            .eq("id", params.id)
            .then(({ data }) =>
                data!.map((place) => mapPlace(place as PlaceDB))
            );
    }

    return query.then(({ data }) =>
        data!.map((place) => mapPlace(place as PlaceDB))
    );
};

export const PlacesActions = {
    get,
};
