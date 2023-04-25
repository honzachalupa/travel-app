import { Place } from "@/types/map";

export interface PlaceDB {
    id: string;
    name: string;
    description: string;
    type: string;
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

export const mapPlace = ({
    id,
    name,
    description,
    type,
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
    // @ts-ignore
    type,
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
