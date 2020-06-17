import { User } from 'firebase';
import { IPlaceRemote } from "./Place";

export interface IContext {
    currentLocation: {
        latitude: number;
        longitude: number;
        timestamp: number;
    };
    places: IPlaceRemote[];
    visits: { [key: string]: string[] };
    placesLoadingState: string;
    currentUser: User;
    isDarkModeSupported: boolean;
    isDarkModeOn: boolean;
    isIosInstalled: boolean;
    setLoadingState: () => void;
    setIsDarkModeSupported: (value: boolean) => void;
    setIsDarkModeOn: (value: boolean) => void;
}
