import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import { ButtonWithIcon, EColors } from 'Components/Button';
import Map from 'Components/Map';
import Navigation from 'Components/Navigation';
import { DifficultyCodes } from 'Enums/Difficulties';
import { ELoadingStates } from 'Enums/LoadingStates';
import { Routes } from 'Enums/Routes';
import { calculateDistance } from 'Helpers';
import ArrowDownIcon from 'Icons/arrow-down.svg';
import ArrowUpIcon from 'Icons/arrow-up.svg';
import FilterIcon from 'Icons/filter.svg';
import PlusIcon from 'Icons/plus.svg';
import SettingsIcon from 'Icons/profile.svg';
import { IContext } from 'Interfaces/Context';
import { IPlaceWithId, IPlaceWithIdWithDistance } from 'Interfaces/Place';
import Layout from 'Layouts/Main';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Filter, { IFilterData } from './components/Filter';
import PlacesList from './components/PlacesList';
import SelectedPlaceInfoBox from './components/SelectedPlaceInfoBox';
import './style';
import Performance from '../../Performance';

export default withRouter(({ history }: RouteComponentProps) => {
    const { places: placesContext, placesLoadingState, currentLocation, currentUser } = useContext(Context) as IContext;
    const [places, setPlaces] = useState<IPlaceWithIdWithDistance[]>([]);
    const [isFilterExpanded, setFilterExpanded] = useState<boolean>(false);
    const [isMapExpanded, setMapExpanded] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState<IPlaceWithId | null>(null);
    const [filterData, setFilterData] = useState<IFilterData>();

    useEffect(() => {
        if (placesLoadingState === ELoadingStates.LOADED && currentLocation.timestamp && filterData) {
            const p = new Performance('Calculating distance from current location and ordering.');
            p.start();

            const placesFiltered = [...placesContext].map(place => ({
                ...place,
                distance: calculateDistance(place.coordinates, currentLocation)
            })).sort((a, b) => a.distance - b.distance).filter(place =>
                (filterData.difficultyCode === DifficultyCodes.NONE || place.accessibility.difficultyCode === filterData.difficultyCode) &&
                place.accessibility.walkingDistance >= filterData.walkingDistancesFrom &&
                place.accessibility.walkingDistance <= filterData.walkingDistancesTo
            );

            setPlaces(placesFiltered);

            p.end();
        };
    }, [placesLoadingState, currentLocation.latitude, currentLocation.longitude, filterData]);

    return (
        <Layout>
            <div data-component="Page_Home" className={cx({ 'is-filter-expanded': isFilterExpanded, 'is-map-expanded': isMapExpanded })}>
                <ButtonWithIcon
                    className="settings-button"
                    icon={SettingsIcon}
                    color={EColors.WHITE_TRANSPARENT}
                    onClick={() => history.push(Routes.SETTINGS)}
                />

                <div className={cx('map-container', { 'is-expanded': isMapExpanded })}>
                    {(places && places && filterData) && (
                        <Map
                            places={places}
                            filteredIds={places.map(x => x.id)}
                            isFullWidth
                            onPlaceClick={setSelectedPlace}
                        />
                    )}

                    {selectedPlace && (
                        <SelectedPlaceInfoBox place={selectedPlace} onClose={() => setSelectedPlace(null)} />
                    )}

                    {places && (
                        <ButtonWithIcon
                            className="toggle-filter-button"
                            icon={FilterIcon}
                            color={EColors.ORANGE}
                            onClick={() => setFilterExpanded(!isFilterExpanded)}
                        />
                    )}

                    {places && (
                        <ButtonWithIcon
                            className="toggle-map-button"
                            icon={isMapExpanded ? ArrowUpIcon : ArrowDownIcon}
                            color={EColors.ORANGE}
                            onClick={() => { setSelectedPlace(null); setFilterExpanded(false); setMapExpanded(!isMapExpanded); }}
                        />
                    )}
                </div>

                <div className="filter-container">
                    <Filter onFilterChange={setFilterData} />
                </div>

                <PlacesList places={places} />

                <Navigation
                    items={[currentUser ? {
                        label: 'Přidat',
                        icon: PlusIcon,
                        color: EColors.GREEN,
                        onClick: () => history.push(Routes.PLACE_CREATE)
                    } : null]}
                    singleItemAlignment="right"
                />
            </div>
        </Layout>
    );
});
