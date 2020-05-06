import config from 'config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(config.firebase);

const Authentication = firebase.auth();

const Database = {
    ...firebase.firestore(),
    places: firebase.firestore().collection('places'),
    getTimestamp: () => firebase.firestore.Timestamp.now()
};

export { Authentication, Database };

