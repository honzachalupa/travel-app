import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import { ButtonWithIcon, EColors } from 'Components/Button';
import Map from 'Components/Map';
import Navigation from 'Components/Navigation';
import { Routes } from 'Enums/Routes';
import { calculateDistance } from 'Helpers';
import SettingsIcon from 'Icons/settings.svg';
import { IContext } from 'Interfaces/Context';
import { IPlaceWithId } from 'Interfaces/Place';
import Layout from 'Layouts/Main';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import { usePosition } from 'use-position';
import './style';

export default withRouter(({ history }: RouteComponentProps) => {
    const currentLocation = usePosition(true);
    const { places } = useContext(Context) as IContext;
    const [placesClone, setPlacesClone] = useState<IPlaceWithId[] | null>();
    const [isMapExpanded, setMapExpanded] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState<IPlaceWithId | null>(null);

    useEffect(() => {
        if (currentLocation.timestamp) {
            const placesCloneTemp = [...places].map(place => ({
                ...place,
                distance: calculateDistance(place.coordinates, currentLocation)
            })).sort((a, b) =>
                (a.distance < b.distance) ? -1 :
                    (a.distance > b.distance) ? 1 :
                        0);

            setPlacesClone(placesCloneTemp);
        };
    }, [currentLocation.timestamp]);

    return (
        <Layout>
            <div data-component="Page_Home">
                <button className="settings-button" onClick={() => history.push(Routes.SETTINGS)}>
                    <img className="icon" src={SettingsIcon} alt="" />
                </button>

                <div className={cx('my-location-map', { 'is-expanded': isMapExpanded })}>
                    <Map
                        markers={places}
                        onPlaceClick={setSelectedPlace}
                    />

                    {selectedPlace && (
                        <div className="selected-place-info">
                            <button className="name" type="button" onClick={() => history.push(Routes.PLACE_DETAIL.replace(':id', selectedPlace.id))}>{selectedPlace.name}</button>
                            <button className="close-button" type="button" onClick={() => setSelectedPlace(null)}>Zavřít</button>
                        </div>
                    )}

                    <ButtonWithIcon
                        className="toggle-button"
                        icon={isMapExpanded ? 'A' : 'V'}
                        color={EColors.ORANGE}
                        onClick={() => { setSelectedPlace(null); setMapExpanded(!isMapExpanded); }}
                    />
                </div>

                {placesClone && (
                    <div className={cx('places-list', { 'is-faded': isMapExpanded })}>
                        {placesClone.map(place => (
                            <div key={place.id} className="place" onClick={() => history.push(Routes.PLACE_DETAIL.replace(':id', place.id))}>
                                <h3 className="name">
                                    <Textfit mode="single" max={20}>
                                        {/*
                                        // @ts-ignore */}
                                        {place.name} ({place.distance} km)
                                    </Textfit>
                                </h3>

                                <div className="details">
                                    <img className="image" src={place.images[0]} />
                                    <p className="description">{place.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Navigation
                    items={[{
                        label: 'Přidat',
                        icon: '+',
                        color: EColors.GREEN,
                        onClick: () => history.push(Routes.PLACE_CREATE)
                    }]}
                    singleItemAlignment="right"
                />
            </div>
        </Layout>
    );
});
