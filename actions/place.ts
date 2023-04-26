import { Place } from "@/types/map";
import { User } from "@/types/user";
import { mapPlace, PlaceDB } from "@/utils/api";
import { supabase } from "@/utils/supabase";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { UserActions } from "./user";

const get = async (params: { id: Place["id"] }): Promise<Place[]> =>
    supabase
        .from("places")
        .select("*")
        .eq("id", params.id)
        .then(({ data }) => data!.map((place) => mapPlace(place as PlaceDB)));

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
        createdAt: moment().format(),
    });

const update = async (
    id: Place["id"],
    {
        name,
        description,
        type,
        coordinates,
        address,
        contact,
        originalQuery,
    }: Omit<Place, "id" | "ownerId">
) =>
    supabase
        .from("places")
        .update({
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
            updatedAt: moment().format(),
        })
        .eq("id", id);

const delete_ = async (id: Place["id"]) =>
    supabase.from("places").delete().eq("id", id);

const setIsVisited = async ({
    placeId,
    userId,
}: {
    placeId: Place["id"];
    userId: User["id"];
}) => {
    const { visitedPlaceIds } = await UserActions.get(userId);

    return supabase
        .from("users")
        .update({
            visitedPlaceIds: [...new Set([...visitedPlaceIds, placeId])],
        })
        .eq("id", userId);
};

const setIsNotVisited = async ({
    placeId,
    userId,
}: {
    placeId: Place["id"];
    userId: User["id"];
}) => {
    const { visitedPlaceIds } = await UserActions.get(userId);

    return supabase
        .from("users")
        .update({
            visitedPlaceIds: [...visitedPlaceIds].filter(
                (id) => id !== placeId
            ),
        })
        .eq("id", userId);
};

export const PlaceActions = {
    get,
    create,
    update,
    delete: delete_,
    setIsVisited,
    setIsNotVisited,
};
