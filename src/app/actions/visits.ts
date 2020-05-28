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
    getById: (
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
    get: (
        setCallback: (visits: any) => void
    ) => {
        const unsubscribe = Database.visits.onSnapshot((querySnapshot: any) => {
            const visits: { [key: string]: string[] } = {};

            querySnapshot.forEach((doc: any) => {
                const visit = doc.data() as { [key: string]: boolean };
                const userIDs: string[] = [];

                Object.keys(visit).forEach(key => {
                    if (visit[key]) {
                        userIDs.push(key);
                    }
                });

                visits[doc.id] = userIDs;
            });

            setCallback(visits);
            unsubscribe();
        });
    }
};
