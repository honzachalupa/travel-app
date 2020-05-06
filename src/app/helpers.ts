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

const readUploadedFile = (inputFile: any) => {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onload = () => {
            if (fileReader.result) {
                resolve(fileReader.result.toString());
            } else {
                reject(new DOMException('Problem parsing input file.'));
            }
        };

        fileReader.onerror = () => {
            fileReader.abort();

            reject(new DOMException('Problem parsing input file.'));
        };

        fileReader.readAsDataURL(inputFile);
    });
};

export { Authentication, Database, readUploadedFile };

