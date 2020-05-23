import { Database } from 'Helpers';
import { IContext } from 'Interfaces/Context';

export default {
    set: (
        placeId: string,
        value: boolean
    ) => {
        const { currentUser } = window['context'] as IContext;

        const unsubscribe = Database.visits.doc(placeId).onSnapshot(doc => {
            const visits = doc.data() as { [key: string]: number };

            Database.visits.doc(placeId).set({
                ...visits || [],
                [currentUser.uid]: value
            });

            unsubscribe();
        });
    },
    get: (
        placeId: string,
        setCallback: (isVisited: boolean) => void
    ) => {
        const { currentUser } = window['context'] as IContext;

        Database.visits.doc(placeId).onSnapshot(doc => {
            const visits = doc.data() as { [key: string]: boolean };

            if (visits) {
                setCallback(visits[currentUser.uid] ? visits[currentUser.uid] : false);
            }
        });
    },
    getById: (
        placeId: string,
        setCallback: (userIDs: string[]) => void
    ) => {
        Database.visits.doc(placeId).onSnapshot(doc => {
            const visits = doc.data() as { [key: string]: boolean };
            const userIDs = visits ? Object.keys(visits) : [];

            setCallback(userIDs);
        });
    }
};
