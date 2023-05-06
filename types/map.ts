import { Coordinates } from "@/components/Map/Map.types";
import { User } from "./user";

export enum NavigationAppLabels {
    "apple-maps" = "Apple Maps",
    "google-maps" = "Google Maps",
    "waze" = "Waze",
    "mapy-cz" = "Mapy.cz",
}

export type NavigationAppId = keyof typeof NavigationAppLabels;

export const PlaceTypes = {
    city: "Město",
    mountain: "Hora, kopec, vrchol",
    viewpoint: "Rozhledna, vyhlídka",
    lake: "Jezero, nádrž, rybník",
    river: "Řeka, potok",
    waterfall: "Vodopád",
    cave: "Jeskyně",
    museum: "Muzeum",
    zoo: "Zoo",
    church: "Kostel",
    castle: "Hrad/zámek",
    ruine: "Zřícenina",
    park: "Park",
    beach: "Pláž",
    bridge: "Most",
    restaurant: "Restaurace",
    bar: "Bar",
    "amusement-park": "Zábavní park",
    "national-park": "Přírodní rezervace",
    other: "Jiné",
};

export type PlaceType = keyof typeof PlaceTypes;

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
        url?: string;
        instagramUrl?: string;
    };
    originalQuery?: string;
    ownerId: User["id"];
}
