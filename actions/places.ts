import { Place } from "@/types/map";
import { supabase } from "@/utils/supabase";

const get = async () =>
    supabase
        .from("places")
        .select("*")
        .then(({ data }) =>
            data!.map(
                ({
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
                }): Place => ({
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
                })
            )
        );

export const PlacesActions = {
    get,
};
