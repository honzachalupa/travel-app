import { Context } from '@honzachalupa/helpers';
import { Difficulties, DifficultyCodes } from 'Enums/Difficulties';
import { ELoadingStates } from 'Enums/LoadingStates';
import { findInEnum, removeDuplicates, TimeCost } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { IPlaceRemote } from 'Interfaces/Place';
import React, { useContext, useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import './style';

interface IProps {
    isExpanded: boolean;
    onFilterChange: (e: IFilterData) => void;
}

interface IAvailableOptions {
    walkingDistances: number[];
    difficultyCodes: DifficultyCodes[];
}

export interface IFilterData {
    _isFilterActive: boolean;
    difficultyCode: DifficultyCodes;
    walkingDistancesFrom: number;
    walkingDistancesTo: number;
    includeVisitedPlaces: boolean;
}

export default (props: IProps) => {
    const { places, placesLoadingState, currentUser } = useContext(Context) as IContext;

    const walkingDistances = [0, 0.5, 1, 2.5, 5, 7.5, 10, 15, 20];

    const defaultFilter = {
        difficultyCode: DifficultyCodes.NONE,
        walkingDistancesFrom: walkingDistances[0],
        walkingDistancesTo: walkingDistances[walkingDistances.length - 1],
        includeVisitedPlaces: false
    };

    const [availableOptions, setAvailableOptions] = useState<IAvailableOptions | null>(null);
    const [difficultyCode, setDifficultyCode] = useState<IFilterData['difficultyCode']>();
    const [walkingDistancesFrom, setWalkingDistancesFrom] = useState<IFilterData['walkingDistancesFrom']>();
    const [walkingDistancesTo, setWalkingDistancesTo] = useState<IFilterData['walkingDistancesTo']>();
    const [includeVisitedPlaces, setIncludeVisitedPlaces] = useState<IFilterData['includeVisitedPlaces']>();

    const getFilterData = (places: IPlaceRemote[]) => {
        const p = new TimeCost('getFilterData');
        p.start();

        const difficultyCodes: DifficultyCodes[] = [];

        places.forEach(place => {
            difficultyCodes.push(place.accessibility.difficultyCode);
        });

        setAvailableOptions({
            walkingDistances,
            difficultyCodes: difficultyCodes.filter(removeDuplicates).sort()
        });

        const storageItem = localStorage.getItem('filter');

        if (storageItem) {
            const filterData = JSON.parse(storageItem);

            setDifficultyCode(filterData.difficultyCode);
            setWalkingDistancesFrom(filterData.walkingDistancesFrom);
            setWalkingDistancesTo(filterData.walkingDistancesTo);
            setIncludeVisitedPlaces(filterData.includeVisitedPlaces);
        } else {
            setDifficultyCode(defaultFilter.difficultyCode);
            setWalkingDistancesFrom(defaultFilter.walkingDistancesFrom);
            setWalkingDistancesTo(defaultFilter.walkingDistancesTo);
            setIncludeVisitedPlaces(defaultFilter.includeVisitedPlaces);
        }

        p.end();
    };

    useEffect(() => {
        if (placesLoadingState === ELoadingStates.LOADED) {
            getFilterData(places);
        }
    }, [placesLoadingState]);

    useEffect(() => {
        if (difficultyCode && Number(walkingDistancesFrom) !== Number.NaN && Number(walkingDistancesTo) !== Number.NaN) {
            const filterData = {
                _isFilterActive:
                    difficultyCode !== defaultFilter.difficultyCode ||
                    walkingDistancesFrom !== defaultFilter.walkingDistancesFrom ||
                    walkingDistancesTo !== defaultFilter.walkingDistancesTo,
                difficultyCode,
                walkingDistancesFrom,
                walkingDistancesTo,
                includeVisitedPlaces: currentUser ? includeVisitedPlaces : false
            } as IFilterData;

            props.onFilterChange(filterData);

            localStorage.setItem('filter', JSON.stringify(filterData));
        }
    }, [difficultyCode, walkingDistancesFrom, walkingDistancesTo, includeVisitedPlaces]);

    return availableOptions && difficultyCode && walkingDistancesFrom !== undefined && walkingDistancesTo !== undefined ? (
        <form data-component="Filter" className="form">
            <AnimateHeight height={props.isExpanded ? 'auto' : 0} contentClassName="animated-container">
                <div className="item">
                    <label htmlFor="difficultyCode">Náročnost</label>
                    <select name="difficultyCode" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDifficultyCode(e.target.value as DifficultyCodes)} defaultValue={difficultyCode}>
                        <option value={DifficultyCodes.NONE}>Všechny</option>

                        {availableOptions.difficultyCodes.map(code => (
                            <option key={code} value={code}>{findInEnum(Difficulties, code).label}</option>
                        ))}
                    </select>
                </div>

                <div className="item">
                    <label htmlFor="walkingDistancesFrom">Pěší vzdálenost od</label>
                    <select name="walkingDistancesFrom" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWalkingDistancesFrom(Number(e.target.value))} defaultValue={walkingDistancesFrom}>
                        {availableOptions.walkingDistances.filter(x => x < walkingDistancesTo).map(distance => (
                            <option key={distance} value={distance}>{distance} km</option>
                        ))}
                    </select>
                </div>

                <div className="item">
                    <label htmlFor="walkingDistancesTo">Pěší vzdálenost do</label>
                    <select name="walkingDistancesTo" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWalkingDistancesTo(Number(e.target.value))} defaultValue={walkingDistancesTo}>
                        {availableOptions.walkingDistances.filter(x => x > walkingDistancesFrom).map(distance => (
                            <option key={distance} value={distance}>{distance} km</option>
                        ))}
                    </select>
                </div>

                {currentUser && (
                    <div className="item">
                    <input name="includeVisitedPlaces" type="checkbox" defaultChecked={includeVisitedPlaces} onChange={() => setIncludeVisitedPlaces(!includeVisitedPlaces)} />
                    <label htmlFor="includeVisitedPlaces">Zahrnout již navštívená místa</label>
                </div>
                )}
            </AnimateHeight>
        </form>
    ) : null;
}
