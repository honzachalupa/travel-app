import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from 'config';

firebase.initializeApp(config.firebase);

const Authentication = firebase.auth();

const Database = {
    ...firebase.firestore(),
    places: firebase.firestore().collection('locations'),
    getTimestamp: () => firebase.firestore.Timestamp.now()
};

export {
    Authentication,
    Database
};
