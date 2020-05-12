/* globals __BASENAME__ */

import '@babel/polyfill';
import { app, Context } from '@honzachalupa/helpers';
import config from 'config';
import { ELoadingStates } from 'Enums/LoadingStates';
import { Routes } from 'Enums/Routes';
import { User } from 'firebase';
import { Authentication, Database } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { IPlaceWithId } from 'Interfaces/Place';
import Page_Home from 'Pages/Home';
import Page_NotFound from 'Pages/NotFound';
import Page_PlaceCreate from 'Pages/Place/Create';
import Page_PlaceDetail from 'Pages/Place/Detail';
import Page_PlaceEdit from 'Pages/Place/Edit';
import Page_PlaceImport from 'Pages/Place/Import';
import Page_Settings from 'Pages/Settings';
import Page_SignIn from 'Pages/SignIn';
import Page_SignUp from 'Pages/SignUp';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { usePosition } from 'use-position';
import './App.scss';
import Performance from './Performance';

const App = () => {
    const currentLocation = usePosition(true);
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [placesLoadingState, setLoadingState] = useState<string>(ELoadingStates.WAITING);
    const [places, setPlaces] = useState<IPlaceWithId[]>([]);

    useEffect(() => {
        if (config.caching) {
            app.initServiceWorker();
        }

        Authentication.onAuthStateChanged(user => setCurrentUser(user));
    }, []);

    useEffect(() => {
        if (currentUser !== undefined && placesLoadingState === ELoadingStates.WAITING) {
            const p = new Performance('Fetching data from Firebase.');
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
                    <Route path={Routes.SETTINGS} component={Page_Settings} exact />
                    <Route component={Page_NotFound} exact />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

render(<App />, document.querySelector('#app'));
