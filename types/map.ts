import { Coordinates } from "@/components/Map/Map.types";

export enum PlaceTypes {
    "city" = "city",
    "mountain" = "mountain",
    "restaurant" = "restaurant",
    "entertainment" = "entertainment",
}

export type PlaceType = typeof PlaceTypes;

export interface Place {
    id: string;
    name: string;
    description?: string;
    type?: PlaceType;
    coordinates: Coordinates;
    address?: {
        street?: string;
        houseNumber?: number;
        city?: string;
        country?: string;
    };
    contact?: {
        emailAddress?: string;
        phoneNumber?: string;
    };
}
