/* globals __BASENAME__ */

import '@babel/polyfill';
import { app, Context } from '@honzachalupa/helpers';
import config from 'config';
import { Routes } from 'Enums/Routes';
import { Database } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { IPlaceWithId } from 'Interfaces/Place';
import Page_Home from 'Pages/Home';
import Page_NotFound from 'Pages/NotFound';
import Page_PlaceCreate from 'Pages/Place/Create';
import Page_PlaceDetail from 'Pages/Place/Detail';
import Page_PlaceImport from 'Pages/Place/Import';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

export interface IState {
    places: IPlaceWithId[]
}

const App = () => {
    const [state, setState] = useState<IState>({
        places: []
    });

    const getLocations = () => {
        Database.places.onSnapshot((querySnapshot: any) => {
            const places: IPlaceWithId[] = [];

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
                    <Route component={Page_Home} path={Routes.INDEX} />
                    <Route component={Page_Home} path={Routes.ROOT} exact />
                    <Route component={Page_PlaceCreate} path={Routes.PLACE_CREATE} exact />
                    <Route component={Page_PlaceDetail} path={Routes.PLACE_DETAIL} exact />
                    <Route component={Page_PlaceImport} path={Routes.PLACE_IMPORT} exact />
                    <Route component={Page_NotFound} exact />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

render(<App />, document.querySelector('#app'));
