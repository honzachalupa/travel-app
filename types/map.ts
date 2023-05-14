import { Coordinates } from "@/components/Map/Map.types";
import { IUser } from "@honzachalupa/admin";

export enum ENavigationAppLabels {
    "apple-maps" = "Apple Maps",
    "google-maps" = "Google Maps",
    "waze" = "Waze",
    "mapy-cz" = "Mapy.cz",
}

export type TNavigationAppId = keyof typeof ENavigationAppLabels;

export const EPlaceTypes = {
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

export type TPlaceType = keyof typeof EPlaceTypes;

export interface IPlace {
    id: string;
    name: string;
    description?: string;
    type?: TPlaceType;
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
    ownerId: IUser["id"];
}

export interface IPlaceVisit {
    id: string;
    userId: IUser["id"];
    placeIds: IPlace["id"][];
}
