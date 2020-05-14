/* globals __BASENAME__ */

import '@babel/polyfill';
import { app, Context } from '@honzachalupa/helpers';
import config from 'config';
import { ELoadingStates } from 'Enums/LoadingStates';
import { Routes } from 'Enums/Routes';
import { User } from 'firebase';
import { Authentication, Database, TimeCost } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { ICoordinates, IPlaceRemote } from 'Interfaces/Place';
import Page_AdministrationPlacesToEdit from 'Pages/Administration/PlacesToEdit';
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
    const [currentLocation, setCurrentLocation] = useState<ICoordinates>({ latitude: 0, longitude: 0 });
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [placesLoadingState, setLoadingState] = useState<string>(ELoadingStates.WAITING);
    const [places, setPlaces] = useState<IPlaceRemote[]>([]);

    useEffect(() => {
        if (config.caching) {
            app.initServiceWorker();
        }

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(({ coords: { latitude, longitude } }) => {
                setCurrentLocation({ latitude, longitude });
            });
        } else {
            console.log('Geolocation denied.');
        }

        Authentication.onAuthStateChanged(user => setCurrentUser(user));
    }, []);

    useEffect(() => {
        if (currentUser !== undefined && placesLoadingState === ELoadingStates.WAITING) {
            const p = new TimeCost('Fetching data from Firebase.');
            p.start();

            Database.getPlaces(setPlaces, setLoadingState);

            p.end();
        }
    }, [currentUser]);

    return (
        <Context.Provider value={{ currentLocation, currentUser, placesLoadingState, places } as IContext}>
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
                    <Route path={Routes.ADMINISTRATION_PLACES_TO_EDIT} component={Page_AdministrationPlacesToEdit} exact />
                    <Route component={Page_NotFound} exact />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

render(<App />, document.querySelector('#app'));
