import { Database } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { IPlace } from 'Interfaces/Place';

export default {
    set: (
        placeId: string
    ) => {
        const { currentUser } = window['context'] as IContext;

        const unsubscribe = Database.places.doc(placeId).onSnapshot(doc => {
            const place = doc.data() as IPlace;

             Database.places.doc(placeId).set({
                ...place,
                usersVisited: [...place.usersVisited, currentUser.uid]
            });

            unsubscribe();
        });
    },
    delete: (
        placeId: string
    ) => {
        const { currentUser } = window['context'] as IContext;

        const unsubscribe = Database.places.doc(placeId).onSnapshot(doc => {
            const place = doc.data() as IPlace;

            Database.places.doc(placeId).set({
                ...place,
                usersVisited: place.usersVisited.filter((id: string) => id !== currentUser.uid)
            });

            unsubscribe();
        });
    }
};
