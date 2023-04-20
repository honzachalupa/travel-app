import { Place } from "@/types/map";
import { supabase } from "@/utils/supabase";
import { v4 as uuid } from "uuid";

const create = async ({
    name,
    description,
    type,
    coordinates,
    address,
    contact,
}: Omit<Place, "id">) =>
    supabase.from("places").insert({
        id: uuid(),
        name,
        description,
        type,
        coordinates_longitude: coordinates.longitude,
        coordinates_latitude: coordinates.latitude,
        address_street: address?.street,
        address_houseNumber: address?.houseNumber,
        address_city: address?.city,
        address_country: address?.country,
        contact_phoneNumber: contact?.phoneNumber,
        contact_emailAddress: contact?.emailAddress,
    });

export const PlaceActions = {
    create,
};
