import { IPlace } from "@/types/map";
import { mapPlace, PlaceDB, resolveAdminApiUrl } from "@/utils/api";
import moment from "moment";

const get = (params: { id: IPlace["id"] }): Promise<IPlace> =>
    fetch(
        resolveAdminApiUrl(
            `/api/travel-app/places?id=${params.id}&single=true`
        ),
        {
            method: "GET",
        }
    ).then(async (response) => {
        const data: PlaceDB = await response.json();

        return mapPlace(data);
    });

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
    fetch(resolveAdminApiUrl("/api/travel-app/places"), {
        method: "POST",
        body: JSON.stringify({
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
        }),
    }).then((response) => response.json());

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
    fetch(resolveAdminApiUrl(`/api/travel-app/places?id=${id}`), {
        method: "PATCH",
        body: JSON.stringify({
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
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());

const delete_ = async (id: IPlace["id"]) =>
    fetch(resolveAdminApiUrl(`/api/travel-app/places?id=${id}`), {
        method: "DELETE",
    }).then((response) => response.json());

export const PlaceActions = {
    get,
    create,
    update,
    delete: delete_,
};
