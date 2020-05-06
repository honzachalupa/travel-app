import config from 'config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ICoordinates } from 'Interfaces/Place';

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

const calculateDistance = (coordinateA: ICoordinates, coordinateB: ICoordinates) => {
    const lat1 = coordinateA.latitude;
    const lon1 = coordinateA.longitude;

    const lat2 = coordinateB.latitude;
    const lon2 = coordinateB.longitude;

    const R = 6371e3;
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) + ((Math.cos(φ1) * Math.cos(φ2)) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2)));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return Math.max(Math.round(distance / 1000), 1);
}

export { Authentication, Database, readUploadedFile, calculateDistance };

