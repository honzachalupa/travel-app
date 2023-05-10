import { IPlace } from "@/types/map";
import { mapPlace, PlaceDB } from "@/utils/api";
import { supabase } from "@/utils/supabase";
import { IUser, UserActions } from "@honzachalupa/admin";
import moment from "moment";
import { v4 as uuid } from "uuid";

const get = async (params: { id: IPlace["id"] }): Promise<IPlace[]> =>
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
}: Omit<IPlace, "id">) =>
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
        contact_url: contact?.url,
        originalQuery,
        ownerId,
        createdAt: moment().format(),
    });

const update = async (
    id: IPlace["id"],
    {
        name,
        description,
        type,
        coordinates,
        address,
        contact,
        originalQuery,
    }: Omit<IPlace, "id" | "ownerId">
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
            contact_url: contact?.url,
            contact_instagramUrl: contact?.instagramUrl,
            originalQuery,
            updatedAt: moment().format(),
        })
        .eq("id", id);

const delete_ = async (id: IPlace["id"]) =>
    supabase.from("places").delete().eq("id", id);

const setIsVisited = async ({
    placeId,
    userId,
}: {
    placeId: IPlace["id"];
    userId: IUser["id"];
}) => {
    const { visitedPlaceIds } = await UserActions.searchSingle(userId);

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
    placeId: IPlace["id"];
    userId: IUser["id"];
}) => {
    const { visitedPlaceIds } = await UserActions.searchSingle(userId);

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
