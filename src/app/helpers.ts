import config from 'config';
import { ERoles } from 'Enums/Roles';
import firebase, { User } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ICoordinates } from 'Interfaces/Place';

firebase.initializeApp(config.firebase);

const Authentication = firebase.auth();

class TimeCost {
    isUsed = false;
    description: string;
    startedAt = 0;

    constructor(description: string) {
        this.description = description;
    }

    start = () => {
        this.startedAt = performance.now();
    }

    end = (disableAfterRun?: boolean) => {
        if (!this.isUsed) {
            const ms = performance.now() - this.startedAt;
            const timeString = ms < 1000 ?
                `${Math.round(ms * 1000) / 1000} miliseconds` :
                `${Math.round(ms) / 1000} seconds`;

            console.log(`Task "${this.description}" run for ${timeString}.`);

            if (disableAfterRun) {
                this.isUsed = true;
            }
        }
    }
}

const Database = {
    ...firebase.firestore().enablePersistence({ synchronizeTabs: true }),
    users: firebase.firestore().collection('users'),
    places: firebase.firestore().collection('places'),
    visits: firebase.firestore().collection('visits'),
    ratings: firebase.firestore().collection('ratings'),
    getTimestamp: firebase.firestore.Timestamp.now
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

const calculateDistance = (coordinateA: ICoordinates, coordinateB?: ICoordinates) => {
    if (!coordinateB) {
        coordinateB = {
            latitude: 50.08804,
            longitude: 14.42076
        };
    }

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

    return Math.round(distance);
}

const formatDistance = (meters: number) =>
    meters < 1000 ?
        `${meters} m` :
        meters < 5000 ?
            `${Math.round(meters / 1000 * 10) / 10} km`.replace('.', ',') :
            `${Math.round(meters / 1000)} km`.replace('.', ',');

const findInEnum = (enumerator: any, key: string) => enumerator.find((x: typeof enumerator) => x.id === key) || { label: null };

const removeDuplicates = (value: string | number, index: number, self: any) => self.indexOf(value) === index;

const hasRole = (currentUser: User | null | undefined, role: string) => {
    const superUsers = ['janchalupa@outlook.cz', 'katharina.binderova@hotmail.com'];
    const admins = ['janchalupa@outlook.cz', 'katharina.binderova@hotmail.com'];

    return currentUser && currentUser.email ?
        role === ERoles.ADMIN && admins.includes(currentUser.email) || role === ERoles.SUPER_USER && superUsers.includes(currentUser.email) :
            false;
};

const getRatingValue = (value: number, count: number) =>
    value > 0 && count > 0 ?
        Math.round(value / count) :
        0;

export { Authentication, Database, TimeCost, readUploadedFile, calculateDistance, formatDistance, findInEnum, removeDuplicates, hasRole, getRatingValue };

