import { ELoadingStates } from 'Enums/LoadingStates';
import { Database } from 'Helpers';
import { TFilterQuery } from 'Interfaces/Firebase';
import { IPlace, IPlacePartial, IPlaceRemote } from 'Interfaces/Place';

export default {
    create: (place: IPlacePartial) => {
        Database.places.add(place);
    },
    get: (
        setPlacesCallback: (places: IPlaceRemote[]) => void,
        setLoadingStatusCallback?: (status: string) => void,
        filterQueries?: TFilterQuery[]
    ) => {
        if (setLoadingStatusCallback) {
            setLoadingStatusCallback(ELoadingStates.LOADING);
        }

        let query = Database.places;

        if (filterQueries) {
            filterQueries.forEach((filterQuery: TFilterQuery) => {
                // @ts-ignore
                query = query.where(...filterQuery);
            });
        }

        query.onSnapshot((querySnapshot: any) => {
            const places: IPlaceRemote[] = [];

            querySnapshot.forEach((doc: any) => {
                const place = doc.data();

                places.push({
                    ...place,
                    id: doc.id
                });
            });

            setPlacesCallback(places);

            if (setLoadingStatusCallback) {
                setLoadingStatusCallback(places.length > 0 ? ELoadingStates.LOADED : ELoadingStates.NO_DATA);
            }
        });
    },
    getById: (
        placeId: string,
        setCallback: (place: IPlaceRemote) => void
    ) => {
        Database.places.doc(placeId).onSnapshot(doc => {
            const place = doc.data() as IPlace;

            setCallback({
                ...place,
                id: doc.id
            });
        });
    },
    delete: (
        placeId: string
    ) => {
        Database.places.doc(placeId).delete();
    }
};
