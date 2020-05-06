import { DifficultyCodes } from './Difficulty';

export interface ICoordinates {
    latitude: number;
    longitude: number;
}

export interface IPlace {
    id?: string;
    name: string;
    description: string;
    coordinates: ICoordinates;
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
}

export interface IPlaceWithId extends IPlace {
    id: string;
}
