import { Database } from 'Helpers';
import { IUser } from 'Interfaces/User';

export default {
    set: (
        userId: string,
        emailAddress: string
    ) => {
        Database.users.doc(userId).set({
            emailAddress
        } as IUser);
    },
    getById: (
        userId: string,
        setCallback: (user: IUser) => void
    ) => {
        Database.users.doc(userId).onSnapshot(doc => {
            const user = doc.data() as IUser;

            if (user) {
                setCallback(user);
            }
        });
    }
};
