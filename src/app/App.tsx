/* globals __BASENAME__ */

import '@babel/polyfill';
import { app, Context, _b, _e } from '@honzachalupa/helpers';
import PlacesActions from 'Actions/places';
import VisitsActions from 'Actions/visits';
import config from 'config';
import { ELoadingStates } from 'Enums/LoadingStates';
import { Routes } from 'Enums/Routes';
import { User } from 'firebase';
import { Authentication, TimeCost } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { ICoordinates, IPlaceRemote } from 'Interfaces/Place';
import Page_AdministrationPlacesArchived from 'Pages/Administration/PlacesArchived';
import Page_AdministrationPlacesToEdit from 'Pages/Administration/PlacesToEdit';
import Page_Home from 'Pages/Home';
import Page_InstallationManual from 'Pages/InstallationManual';
import Page_NotFound from 'Pages/NotFound';
import Page_PlaceBatchOperations from 'Pages/Place/BatchOperations';
import Page_PlaceCreate from 'Pages/Place/Create';
import Page_PlaceDetail from 'Pages/Place/Detail';
import Page_PlaceEdit from 'Pages/Place/Edit';
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
    const [isDarkModeSupported, setIsDarkModeSupported] = useState<boolean>();
    const [isDarkModeOn, setIsDarkModeOn] = useState<boolean>();
    const [isIosInstalled, setIsIosInstalled] = useState<boolean>(true);
    const [places, setPlaces] = useState<IPlaceRemote[]>([]);
    const [visits, setVisits] = useState<{ [key: string]: string[] }>({});

    const getUser = () => {
        Authentication.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
    };

    const getUserLocation = () => {
        const geolocationFallback = () => {
            const itemLS = localStorage.getItem('lastPosition');

            if (itemLS) {
                setCurrentLocation(JSON.parse(itemLS));
            } else {
                setCurrentLocation(config.coordinatesFallback);
            }
        };

        if (navigator.geolocation) {
            const p = new TimeCost('Getting user\'s location.');
            p.start();

            geolocationFallback();

            navigator.geolocation.watchPosition(({ coords: { latitude, longitude } }) => {
                setCurrentLocation({ latitude, longitude });

                localStorage.setItem('lastPosition', JSON.stringify({ latitude, longitude }));

                p.end(true);
            }, geolocationFallback);
        } else {
            geolocationFallback();

            console.log('Geolocation denied.');
        }
    };

    const getTheme = () => {
        try {
            if (window.matchMedia) {
                setIsDarkModeSupported(true);
                setIsDarkModeOn(!!window.matchMedia('(prefers-color-scheme: dark)').matches);

                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                    setIsDarkModeOn(!!e.matches);
                });
            } else {
                setIsDarkModeSupported(false);
                setIsDarkModeOn(false);
            }
        } catch (e) {
            const isDarkModeOn = localStorage.getItem('isDarkModeOn');

            setIsDarkModeSupported(false);
            setIsDarkModeOn(isDarkModeOn === 'true');
        }
    };

    useEffect(() => {
        if (config.caching && _e.isProdEnvironment()) {
            app.initServiceWorker('./sw.js', __BASENAME__);
        }

        getUser();
        getUserLocation();
        getTheme();

        VisitsActions.get(setVisits);

        if (!window.matchMedia('(display-mode: standalone)').matches && _b.getPlatformName() === 'iOS') {
            setIsIosInstalled(false);
        }
    }, []);

    useEffect(() => {
        if (currentUser !== undefined && placesLoadingState === ELoadingStates.WAITING && currentLocation.latitude > 0 && currentLocation.longitude > 0) {
            const p = new TimeCost('Fetching data from Firebase.');
            p.start();

            PlacesActions.get(setPlaces, setLoadingState, [['isPublished', '==', true], ['isArchived', '==', false]]);

            p.end();
        }
    }, [currentUser, currentLocation]);

    useEffect(() => {
        if (isDarkModeOn) {
            document.querySelector('body')?.classList.add('is-dark-mode-on');
        } else {
            document.querySelector('body')?.classList.remove('is-dark-mode-on');
        }
    }, [isDarkModeOn]);

    const context = {
        currentLocation,
        currentUser,
        placesLoadingState,
        places,
        visits,
        isDarkModeSupported,
        isDarkModeOn,
        isIosInstalled,
        setLoadingState,
        setIsDarkModeSupported,
        setIsDarkModeOn
    } as IContext;

    window['context'] = context;

    return (
        <Context.Provider value={context}>
            <Router basename={__BASENAME__}>
                <Switch>
                    <Route path={Routes.INDEX} component={Page_Home} />
                    <Route path={Routes.ROOT} component={Page_Home} exact />
                    <Route path={Routes.SIGN_UP} component={Page_SignUp} exact />
                    <Route path={Routes.SIGN_IN} component={Page_SignIn} exact />
                    <Route path={Routes.PLACE_CREATE} component={Page_PlaceCreate} exact />
                    <Route path={Routes.PLACE_DETAIL} component={Page_PlaceDetail} exact />
                    <Route path={Routes.PLACE_EDIT} component={Page_PlaceEdit} exact />
                    <Route path={Routes.PLACE_BATCH_OPERATIONS} component={Page_PlaceBatchOperations} exact />
                    <Route path={Routes.ADMINISTRATION_PLACES_TO_EDIT} component={Page_AdministrationPlacesToEdit} exact />
                    <Route path={Routes.ADMINISTRATION_PLACES_ARCHIVED} component={Page_AdministrationPlacesArchived} exact />
                    <Route path={Routes.INSTALLATION_MANUAL} component={Page_InstallationManual} exact />
                    <Route component={Page_NotFound} exact />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

render(<App />, document.querySelector('#app'));
