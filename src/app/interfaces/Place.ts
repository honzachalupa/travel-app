import { DifficultyCodes } from "Enums/Difficulties";
import { IWebsite } from "Interfaces/Website";

export interface ICoordinates {
    latitude: number;
    longitude: number;
}

export interface IPlacePartial {
    name: string;
    description: string;
    coordinates: ICoordinates;
    countryCode: string | null;
    rating: {
        value: 0 | 1 | 2 | 3 | 4 | 5;
        count: number;
    };
    images: string[];
    instagramPosts: string[];
    accessibility: {
        walkingDistance: number;
        difficultyCode: DifficultyCodes;
    };
    tags: string[];
    websites: IWebsite[];
    tripIds: string[];
    addedBy: {
        id: string;
        timestamp: any; // To-do: Add correct data type
    };
    updatesHistory: {
        id: string;
        timestamp: any; // To-do: Add correct data type
        changes: any; // To-do: Add correct data type
    }[];
    usersVisited: string[];
}

export interface IPlaceRemote extends IPlacePartial {
    id: string;
}

export interface IPlace extends IPlacePartial {
    id: string;
    distance: number;
}
