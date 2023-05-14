import { IPlace, IPlaceRecord } from "@/types/map";
import { callAPI, mapPlace } from "@/utils/api";
import moment from "moment";

const get = (params: { id: IPlace["id"] }): Promise<IPlace> =>
    callAPI("GET", "/api/travel-app/places", {
        params: {
            id: params.id,
            returnFirst: true,
        },
    }).then((data: IPlaceRecord) => mapPlace(data));

const create = ({
    name,
    description,
    type,
    coordinates,
    address,
    contact,
    originalQuery,
    ownerId,
}: Omit<IPlace, "id">) =>
    callAPI("POST", "/api/travel-app/places", {
        body: {
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
        },
    });

const update = (
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
    callAPI("PATCH", "/api/travel-app/places", {
        body: {
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
        },
    });

const delete_ = (id: IPlace["id"]) =>
    callAPI("DELETE", "/api/travel-app/places", {
        params: { id },
    });

export const PlaceActions = {
    get,
    create,
    update,
    delete: delete_,
};
