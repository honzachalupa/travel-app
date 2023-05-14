import { IPlace, IPlaceRecord } from "@/types/map";

export const callAPI = (
    method: "GET" | "POST" | "PATCH" | "DELETE",
    path: string,
    data?: {
        params?: {
            [key: string]: string | boolean;
        };
        body?: {
            [key: string]: any;
        };
    }
) => {
    const url = new URL(process.env.NEXT_PUBLIC_ADMIN_API_URL + path);

    if (data?.params) {
        Object.entries(data.params).forEach(([key, value]) => {
            url.searchParams.set(key, value.toString());
        });
    }

    return fetch(url, {
        method,
        body: data?.body && JSON.stringify(data.body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
};

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
    contact_url,
    contact_instagramUrl,
    ownerId,
}: IPlaceRecord): IPlace => ({
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
        url: contact_url,
        instagramUrl: contact_instagramUrl,
    },
    ownerId,
});
