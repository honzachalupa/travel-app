/* globals __BASENAME__ */

import '@babel/polyfill';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Context, app } from '@honzachalupa/helpers';
import config from 'config';
import { IContext } from 'Interfaces/Context';
import { Routes } from 'Enums/Routes';
import './App.scss';
import Page_Home from 'Pages/Home';
import Page_LocationCreate from 'Pages/Place/Create';
import Page_LocationDetail from 'Pages/Place/Detail';
import Page_NotFound from 'Pages/NotFound';
import { ILocationWithId } from 'Interfaces/Place';
import { Database } from 'Helpers';

export interface IState {
    places: ILocationWithId[]
}

const App = () => {
    const [state, setState] = useState<IState>({
        places: []
    });

    const getLocations = () => {
        Database.places.onSnapshot((querySnapshot: any) => {
            const places: ILocationWithId[] = [];

            querySnapshot.forEach((doc: any) => {
                places.push({
                    ...doc.data(),
                    id: doc.id
                });
            });

            setState(prevState => ({
                ...prevState,
                places
            }));
        });
    };

    useEffect(() => {
        if (config.caching) {
            app.initServiceWorker();
        }

        getLocations();
    }, []);

    const globalFunctions = {};

    return (
        <Context.Provider value={{ ...state, ...globalFunctions } as IContext}>
            <Router basename={__BASENAME__}>
                <Switch>
                    <Route component={Page_Home} path={Routes.ROOT} exact />
                    <Route component={Page_LocationCreate} path={Routes.LOCATION_CREATE} exact />
                    <Route component={Page_LocationDetail} path={Routes.LOCATION_DETAIL} exact />
                    <Route component={Page_NotFound} exact />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

render(<App />, document.querySelector('#app'));
