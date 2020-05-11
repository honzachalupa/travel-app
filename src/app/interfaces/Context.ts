import { User } from 'firebase';
import { IPlaceWithId } from "./Place";

export interface IContext {
    currentLocation: {
        latitude: number;
        longitude: number;
        timestamp: number;
    };
    places: IPlaceWithId[];
    placesLoadingState: string;
    currentUser: User;
}
