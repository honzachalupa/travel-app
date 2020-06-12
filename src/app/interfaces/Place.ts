import { DifficultyCodes } from 'Enums/Difficulties';

export interface ICoordinates {
    latitude: number;
    longitude: number;
    timestamp?: number;
}

export interface IPlacePartial {
    name: string;
    description: {
        value: string;
        source: string;
    };
    coordinates: ICoordinates;
    countryCode: string | null;
    rating: {
        value: number;
        count: number;
    };
    images: string[];
    instagramPosts: string[];
    accessibility: {
        walkingDistance: number;
        difficultyCode: DifficultyCodes;
    };
    tags: string[];
    websites: string[];
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
    isPublished: boolean;
    isArchived: boolean;
}

export interface IPlaceRemote extends IPlacePartial {
    id: string;
}

export interface IPlace extends IPlacePartial {
    id: string;
    distance: number;
}
