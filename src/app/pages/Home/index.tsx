import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import { ButtonWithIcon, EColors } from 'Components/Button';
import Map from 'Components/Map';
import Navigation from 'Components/Navigation';
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
import { usePosition } from 'use-position';
import Filter, { IFilterData } from './components/Filter';
import PlacesList from './components/PlacesList';
import SelectedPlaceInfoBox from './components/SelectedPlaceInfoBox';
import './style';

export default withRouter(({ history }: RouteComponentProps) => {
    const currentLocation = usePosition(true);
    const { places, currentUser } = useContext(Context) as IContext;

    const [placesClone, setPlacesClone] = useState<IPlaceWithIdWithDistance[] | null>();
    const [placesFiltered, setPlacesFiltered] = useState<IPlaceWithIdWithDistance[] | null>();
    const [isFilterExpanded, setFilterExpanded] = useState<boolean>(false);
    const [isMapExpanded, setMapExpanded] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState<IPlaceWithId | null>(null);
    const [filterData, setFilterData] = useState<IFilterData | null>(null);

    useEffect(() => {
        if (currentLocation.timestamp) {
            const placesCloneTemp = [...places].map(place => ({
                ...place,
                distance: calculateDistance(place.coordinates, currentLocation)
            })).sort((a, b) =>
                (a.distance < b.distance) ? -1 :
                    (a.distance > b.distance) ? 1 : 0);

            setPlacesClone(placesCloneTemp);
        };
    }, [currentLocation.timestamp]);

    useEffect(() => {
        if (filterData && placesClone) {
            const placesFiltered = [...placesClone]; /* .filter(place =>
                (filterData.difficultyCode === DifficultyCodes.NONE || place.accessibility.difficultyCode === filterData.difficultyCode) &&
                place.accessibility.walkingDistance > filterData.walkingDistancesFrom &&
                place.accessibility.walkingDistance < filterData.walkingDistancesTo
            ); */

            setPlacesFiltered(placesFiltered);
        }
    }, [filterData, placesClone]);

    return (
        <Layout>
            <div data-component="Page_Home" className={cx({ 'is-filter-expanded': isFilterExpanded, 'is-map-expanded': isMapExpanded })}>
                <button className="settings-button" onClick={() => history.push(Routes.SETTINGS)}>
                    <img className="icon" src={SettingsIcon} alt="" />
                </button>

                <div className={cx('map-container', { 'is-expanded': isMapExpanded })}>
                    {(placesFiltered && filterData) && (
                        <Map
                            places={places}
                            filteredIds={filterData._isFilterActive ? placesFiltered.map(x => x.id) : places.map(x => x.id)}
                            isFullWidth
                            onPlaceClick={setSelectedPlace}
                        />
                    )}

                    {selectedPlace && (
                        <SelectedPlaceInfoBox place={selectedPlace} onClose={() => setSelectedPlace(null)} />
                    )}

                    <ButtonWithIcon
                        className="toggle-filter-button"
                        icon={FilterIcon}
                        color={EColors.ORANGE}
                        onClick={() => setFilterExpanded(!isFilterExpanded)}
                    />

                    <ButtonWithIcon
                        className="center-map-button"
                        icon={ArrowUpIcon}
                        color={EColors.ORANGE}
                        onClick={() => null}
                    />

                    <ButtonWithIcon
                        className="toggle-map-button"
                        icon={isMapExpanded ? ArrowUpIcon : ArrowDownIcon}
                        color={EColors.ORANGE}
                        onClick={() => { setSelectedPlace(null); setFilterExpanded(false); setMapExpanded(!isMapExpanded); }}
                    />
                </div>

                <div className="filter-container">
                    <Filter onFilterChange={setFilterData} />
                </div>

                {placesFiltered && (
                    <PlacesList places={placesFiltered} />
                )}

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
