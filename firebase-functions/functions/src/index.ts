import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const db = admin.firestore();

export const syncRating = functions.region('europe-west2').firestore
    .document('ratings/{placeId}')
    .onWrite((change, context) => {
        const { placeId } = context.params;
        const data = change.after.data() || {};

        const getRatingValue = (value: number, count: number) =>
            value > 0 && count > 0 ?
                Math.round(value / count) :
                0;

        let sum = 0;
        Object.keys(data).forEach(key => {
            sum += data[key];
        });

        // tslint:disable-next-line: no-floating-promises
        db.doc(`places/${placeId}`).update({
            rating: getRatingValue(sum, Object.keys(data).length)
        });
    });
