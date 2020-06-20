import firebase from 'firebase';
import { Database, getRatingValue } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { IRating } from 'Interfaces/Ratings';

export default {
    set: (
        placeId: string,
        value: number
    ) => {
        const { currentUser } = window['context'] as IContext;

        const unsubscribe = Database.ratings.doc(placeId).onSnapshot(doc => {
            const ratings = doc.data() as { [key: string]: number };

            Database.ratings.doc(placeId).set({
                ...ratings || [],
                [currentUser.uid]: value
            });

            unsubscribe();
        });
    },
    get: (
        placeId: string,
        setCallback: (rating: IRating) => void
    ) => {
        const { currentUser } = window['context'] as IContext;

        Database.ratings.doc(placeId).onSnapshot(doc => {
            const ratings = doc.data() as { [key: string]: number };
            const ratingCount = Object.keys(ratings || {}).length;

            if (ratings) {
                let sum = 0;
                Object.keys(ratings).forEach((userId: any) => sum += ratings[userId]);

                setCallback({
                    value: getRatingValue(sum, ratingCount),
                    count: ratingCount,
                    currentUser: currentUser && currentUser.uid && ratings[currentUser.uid] ? ratings[currentUser.uid] : 0
                });
            }
        });
    },
    delete: (
        placeId: string
    ) => {
        const { currentUser } = window['context'] as IContext;

        Database.ratings.doc(placeId).update({
            [currentUser.uid]: firebase.firestore.FieldValue.delete()
        });
    }
};
