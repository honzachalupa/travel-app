import { RegionCodes } from './Region';
import { AreaCodes } from './SubRegion';
import { DifficultyCodes } from './Difficulty';
import { IComment } from './Comment';

export interface IPlace {
    id?: string;
    name: string;
    description: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    regionCode: RegionCodes;
    areaCode: AreaCodes;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    comments: IComment[];
    accessibility: {
        walkingDistance: number;
        difficultyCode: DifficultyCodes;
    };
    tags: string[];
}

export interface ILocationWithId extends IPlace {
    id: string;
}
