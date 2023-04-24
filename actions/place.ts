import { Place } from "@/types/map";
import { User } from "@/types/user";
import { supabase } from "@/utils/supabase";
import { v4 as uuid } from "uuid";
import { UserActions } from "./user";

const create = async ({
    name,
    description,
    type,
    coordinates,
    address,
    contact,
    originalQuery,
    ownerId,
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
        originalQuery,
        ownerId,
    });

const markAsVisited = async ({
    placeId,
    userId,
}: {
    placeId: Place["id"];
    userId: User["id"];
}) => {
    const user = await UserActions.get(userId);

    return supabase
        .from("users")
        .update({
            visitedPlaceIds: [...new Set([...user.visitedPlaceIds, placeId])],
        })
        .eq("id", userId);
};

const unmarkAsVisited = async ({
    placeId,
    userId,
}: {
    placeId: Place["id"];
    userId: User["id"];
}) => {
    const user = await UserActions.get(userId);

    return supabase
        .from("users")
        .update({
            visitedPlaceIds: [...user.visitedPlaceIds].filter(
                (id) => id !== placeId
            ),
        })
        .eq("id", userId);
};

export const PlaceActions = {
    create,
    markAsVisited,
    unmarkAsVisited,
};
