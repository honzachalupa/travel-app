import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import { ButtonWithIcon, EColors } from 'Components/Button';
import Map from 'Components/Map';
import Menu from 'Components/Menu';
import Navigation from 'Components/Navigation';
import config from 'config';
import { DifficultyCodes } from 'Enums/Difficulties';
import { ELoadingStates } from 'Enums/LoadingStates';
import { Routes } from 'Enums/Routes';
import { calculateDistance, TimeCost } from 'Helpers';
import useDimensions from 'Hooks/useDimensions';
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
import removeAccents from 'remove-accents';
import Filter, { IFilterData } from './components/Filter';
import PlacesList from './components/PlacesList';
import SelectedPlaceInfoBox from './components/SelectedPlaceInfoBox';
import './style';

export default withRouter(({ history }: RouteComponentProps) => {
    const { places: placesContext, visits, placesLoadingState, currentLocation, currentUser } = useContext(Context) as IContext;
    const { width } = useDimensions();
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

    const cleanQuery = (value: string) => removeAccents(value).replace(/\s+/, '');

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
        ) && (
            filterData.query.length === 0 || new RegExp(cleanQuery(filterData.query), 'i').test(cleanQuery(place.name))
        ) &&
        place.accessibility.walkingDistance >= filterData.walkingDistancesFrom &&
        place.accessibility.walkingDistance <= filterData.walkingDistancesTo
    );

    useEffect(() => {
        if (placesLoadingState === ELoadingStates.LOADED && currentLocation.latitude > 0 && currentLocation.longitude > 0 && filterData && visits && Object.keys(visits).length > 0) {
            const p = new TimeCost('Filtering and sorting places.');
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
                <div className="layout-container top-left">
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
                                isFullWidth={width < config.deviceBreakpoint}
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
                </div>

                <div className="layout-container bottom-right">
                    <div className="filter-container">
                        <Filter resultsCount={places.length} onFilterChange={setFilterData} isExpanded={isFilterExpanded || width > config.deviceBreakpoint} />
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
            </div>
        </Layout>
    );
});
