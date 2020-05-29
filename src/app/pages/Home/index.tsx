import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import { ButtonWithIcon, EColors } from 'Components/Button';
import Map from 'Components/Map';
import Menu from 'Components/Menu';
import Navigation from 'Components/Navigation';
import { DifficultyCodes } from 'Enums/Difficulties';
import { ELoadingStates } from 'Enums/LoadingStates';
import { Routes } from 'Enums/Routes';
import { calculateDistance, TimeCost } from 'Helpers';
import ArrowDownIcon from 'Icons/arrow-down.svg';
import ArrowUpIcon from 'Icons/arrow-up.svg';
import FilterIcon from 'Icons/filter.svg';
import PlusIcon from 'Icons/plus.svg';
import SettingsIcon from 'Icons/profile.svg';
import { IContext } from 'Interfaces/Context';
import { IPlace, IPlaceRemote } from 'Interfaces/Place';
import Layout from 'Layouts/WithoutSpacing';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Filter, { IFilterData } from './components/Filter';
import PlacesList from './components/PlacesList';
import SelectedPlaceInfoBox from './components/SelectedPlaceInfoBox';
import './style';

export default withRouter(({ history }: RouteComponentProps) => {
    const { places: placesContext, visits, placesLoadingState, currentLocation, currentUser } = useContext(Context) as IContext;
    const [places, setPlaces] = useState<IPlace[]>([]);
    const [isMenuExpanded, setMenuExpanded] = useState<boolean>(false);
    const [isFilterExpanded, setFilterExpanded] = useState<boolean>(false);
    const [isMapExpanded, setMapExpanded] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState<IPlaceRemote | null>(null);
    const [filterData, setFilterData] = useState<IFilterData>();

    const addDistance = (place: IPlaceRemote) => ({
        ...place,
        distance: calculateDistance(place.coordinates, currentLocation)
    });

    const applyFilter = (place: IPlaceRemote) => (
        filterData &&
        visits && (
            filterData.difficultyCode === DifficultyCodes.NONE ||
            place.accessibility.difficultyCode === filterData.difficultyCode
        ) && (
            !currentUser || (
                filterData.includeVisitedPlaces && (
                    visits[place.id] &&
                    visits[place.id].includes(currentUser.uid)
                ) || (
                    !visits[place.id] ||
                    !visits[place.id].includes(currentUser.uid)
                )
            ) || (
                !filterData.includeVisitedPlaces && (
                    !visits[place.id] ||
                    !visits[place.id].includes(currentUser.uid)
                )
            )
        ) &&
        place.accessibility.walkingDistance >= filterData.walkingDistancesFrom &&
        place.accessibility.walkingDistance <= filterData.walkingDistancesTo
    );

    useEffect(() => {
        if (placesLoadingState === ELoadingStates.LOADED && currentLocation.latitude > 0 && currentLocation.longitude > 0 && filterData && visits && Object.keys(visits).length > 0) {
            const p = new TimeCost('Calculating distance from current location and applying sorting.');
            p.start();

            const itemsFiltered = [...placesContext]
                .filter(applyFilter)
                .map(place => addDistance(place))
                .sort((a: IPlace, b: IPlace) => a.distance - b.distance);

            setPlaces(itemsFiltered as IPlace[]);

            p.end();
        };
    }, [placesLoadingState, currentLocation.latitude, currentLocation.longitude, filterData, visits]);

    return (
        <Layout>
            <div data-component="Page_Home" className={cx({ 'is-filter-expanded': isFilterExpanded, 'is-map-expanded': isMapExpanded })}>
                <Menu isExpanded={isMenuExpanded} />

                <ButtonWithIcon
                    className="settings-button"
                    icon={SettingsIcon}
                    color={EColors.WHITE_TRANSPARENT}
                    onClick={() => setMenuExpanded(!isMenuExpanded)}
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
                            onClick={() => { setMenuExpanded(false); setSelectedPlace(null); setFilterExpanded(false); setMapExpanded(!isMapExpanded); }}
                        />
                    )}
                </div>

                <div className="filter-container">
                    <Filter onFilterChange={setFilterData} isExpanded={isFilterExpanded} />
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
