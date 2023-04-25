import { Coordinates } from "@/components/Map/Map.types";
import { User } from "./user";

export enum NavigationAppLabels {
    "apple-maps" = "Apple Maps",
    "google-maps" = "Google Maps",
    "waze" = "Waze",
    "mapy-cz" = "Mapy.cz",
}

export type NavigationAppId = keyof typeof NavigationAppLabels;

export enum PlaceTypes {
    "city" = "Město",
    "mountain" = "Hora/kopec/vrchol",
    "lake" = "Jezero/nádrž/rybník",
    "waterfall" = "Vodopád",
    "restaurant" = "Restaurace",
    "bar" = "Bar",
    "viewpoint" = "Rozhledna/vyhlídka",
    "cave" = "Jeskyně",
    "museum" = "Muzeum",
    "church" = "Kostel",
    "castle" = "Hrad/zámek",
    "ruine" = "Zřícenina",
    "zoo" = "Zoo",
    "park" = "Park",
    "beach" = "Pláž",
    "bridge" = "Most",
    "amusement-park" = "Zábavní park",
    "national-park" = "Přírodní rezervace",
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
    originalQuery?: string;
    ownerId: User["id"];
}
