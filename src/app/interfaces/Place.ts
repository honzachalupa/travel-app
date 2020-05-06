import { DifficultyCodes } from './Difficulty';
import { IComment } from './Comment';

export interface ICoordinates {
    latitude: number;
    longitude: number;
}

export interface IPlace {
    id?: string;
    name: string;
    description: string;
    coordinates: ICoordinates;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    comments: IComment[];
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
