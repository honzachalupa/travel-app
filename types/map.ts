import { IUser } from "@honzachalupa/admin";
import { ICoordinates } from "@honzachalupa/design-system";

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
    valley: "Údolí",
    viewpoint: "Rozhledna, vyhlídka",
    lake: "Jezero, nádrž, rybník",
    river: "Řeka, potok",
    island: "Ostrov",
    waterfall: "Vodopád",
    cave: "Jeskyně",
    museum: "Muzeum",
    zoo: "Zoo, akvárium",
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
    "military-object": "Vojenský objekt",
    "technology-interest": "Technická zajímavost",
    other: "Jiné",
};

export type TPlaceType = keyof typeof EPlaceTypes;

export interface IPlace {
    id: string;
    name: string;
    description?: string;
    type?: TPlaceType;
    coordinates: ICoordinates;
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
    isFeatured?: boolean;
}

export interface IPlaceRecord {
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
    contact_url: string;
    contact_instagramUrl: string;
    ownerId: string;
    isFeatured: boolean;
}

export interface IPlaceVisit {
    id: string;
    userId: IUser["id"];
    placeIds: IPlace["id"][];
}
