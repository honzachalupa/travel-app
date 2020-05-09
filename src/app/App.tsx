/* globals __BASENAME__ */

import '@babel/polyfill';
import { app, Context } from '@honzachalupa/helpers';
import config from 'config';
import { ECountryCodes } from 'Enums/CountryCodes';
import { ERoles } from 'Enums/Roles';
import { Routes } from 'Enums/Routes';
import { User } from 'firebase';
import { Authentication, Database, hasRole } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { IPlaceWithId } from 'Interfaces/Place';
import Page_Home from 'Pages/Home';
import Page_NotFound from 'Pages/NotFound';
import Page_PlaceCreate from 'Pages/Place/Create';
import Page_PlaceDetail from 'Pages/Place/Detail';
import Page_PlaceEdit from 'Pages/Place/Edit';
import Page_PlaceImport from 'Pages/Place/Import';
import Page_SignIn from 'Pages/SignIn';
import Page_SignUp from 'Pages/SignUp';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';


const App = () => {
    const [currentUser, setCurrentUser] = useState<User | null>();

    const [places, setPlaces] = useState<IPlaceWithId[]>([]);

    const getLocations = () => {
        let dbQuery = Database.places.where('countryCode', '==', ECountryCodes.CZ);

        if (hasRole(currentUser, ERoles.SUPER_USER)) {
            dbQuery = Database.places.limit(10);
        }

        dbQuery.onSnapshot((querySnapshot: any) => {
            const places: IPlaceWithId[] = [];

            querySnapshot.forEach((doc: any) => {
                const place = doc.data();

                places.push({
                    ...place,
                    id: doc.id
                });
            });

            setPlaces(places);
        });
    };

    useEffect(() => {
        if (config.caching) {
            app.initServiceWorker();
        }

        Authentication.onAuthStateChanged(user => setCurrentUser(user));
    }, []);

    useEffect(() => {
        if (currentUser !== undefined) {
            getLocations();
        }
    }, [currentUser]);

    return (
        <Context.Provider value={{ currentUser, places } as IContext}>
            <Router basename={__BASENAME__}>
                <Switch>
                    <Route path={Routes.INDEX} component={Page_Home} />
                    <Route path={Routes.ROOT} component={Page_Home} exact />
                    <Route path={Routes.SIGN_UP} component={Page_SignUp} exact />
                    <Route path={Routes.SIGN_IN} component={Page_SignIn} exact />
                    <Route path={Routes.PLACE_CREATE} component={Page_PlaceCreate} exact />
                    <Route path={Routes.PLACE_DETAIL} component={Page_PlaceDetail} exact />
                    <Route path={Routes.PLACE_EDIT} component={Page_PlaceEdit} exact />
                    <Route path={Routes.PLACE_IMPORT} component={Page_PlaceImport} exact />
                    <Route component={Page_NotFound} exact />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

render(<App />, document.querySelector('#app'));
