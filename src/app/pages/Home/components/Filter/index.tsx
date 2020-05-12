import { Context } from '@honzachalupa/helpers';
import { Difficulties, DifficultyCodes } from 'Enums/Difficulties';
import { ELoadingStates } from 'Enums/LoadingStates';
import { findInEnum, removeDuplicates } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { IPlace } from 'Interfaces/Place';
import React, { useContext, useEffect, useState } from 'react';
import './style';

interface IProps {
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
}

export default (props: IProps) => {
    const { places, placesLoadingState } = useContext(Context) as IContext;

    const walkingDistances = [0, 0.5, 1, 2.5, 5, 7.5, 10, 15, 20];

    const defaultFilter = {
        difficultyCode: DifficultyCodes.NONE,
        walkingDistancesFrom: walkingDistances[0],
        walkingDistancesTo: walkingDistances[walkingDistances.length - 1]
    };

    const [availableOptions, setAvailableOptions] = useState<IAvailableOptions | null>(null);
    const [difficultyCode, setDifficultyCode] = useState<IFilterData['difficultyCode']>();
    const [walkingDistancesFrom, setWalkingDistancesFrom] = useState<IFilterData['walkingDistancesFrom']>();
    const [walkingDistancesTo, setWalkingDistancesTo] = useState<IFilterData['walkingDistancesTo']>();

    const getFilterData = (places: IPlace[]) => {
        const difficultyCodes: DifficultyCodes[] = [];

        places.forEach(place => {
            difficultyCodes.push(place.accessibility.difficultyCode);
        });

        setAvailableOptions({
            walkingDistances,
            difficultyCodes: difficultyCodes.filter(removeDuplicates).sort()
        });

        setDifficultyCode(defaultFilter.difficultyCode);
        setWalkingDistancesFrom(defaultFilter.walkingDistancesFrom);
        setWalkingDistancesTo(defaultFilter.walkingDistancesTo);
    };

    useEffect(() => {
        if (placesLoadingState === ELoadingStates.LOADED) {
            props.onFilterChange({
                _isFilterActive: false,
                difficultyCode: defaultFilter.difficultyCode,
                walkingDistancesFrom: defaultFilter.walkingDistancesFrom,
                walkingDistancesTo: defaultFilter.walkingDistancesTo
            });

            getFilterData(places);
        }
    }, [placesLoadingState]);

    useEffect(() => {
        if (difficultyCode && Number(walkingDistancesFrom) !== Number.NaN && Number(walkingDistancesTo) !== Number.NaN) {
            props.onFilterChange({
                _isFilterActive:
                    difficultyCode !== defaultFilter.difficultyCode ||
                    walkingDistancesFrom !== defaultFilter.walkingDistancesFrom ||
                    walkingDistancesTo !== defaultFilter.walkingDistancesTo,
                difficultyCode,
                // @ts-ignore
                walkingDistancesFrom,
                // @ts-ignore
                walkingDistancesTo
            });
        }
    }, [difficultyCode, walkingDistancesFrom, walkingDistancesTo]);

    return availableOptions && difficultyCode && walkingDistancesFrom !== undefined && walkingDistancesTo !== undefined ? (
        <form data-component="Filter" className="form">
            <div className="item">
                <label htmlFor="difficultyCode">Náročnost</label>
                <select name="difficultyCode" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDifficultyCode(e.target.value as DifficultyCodes)} defaultValue={defaultFilter.difficultyCode}>
                    <option value={DifficultyCodes.NONE}>Všechny</option>

                    {availableOptions.difficultyCodes.map(code => (
                        <option key={code} value={code}>{findInEnum(Difficulties, code).label}</option>
                    ))}
                </select>
            </div>

            <div className="item">
                <label htmlFor="difficultyCode">Pěší vzdálenost od</label>
                <select name="walkingDistancesFrom" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWalkingDistancesFrom(Number(e.target.value))} defaultValue={defaultFilter.walkingDistancesFrom}>
                    {availableOptions.walkingDistances.filter(x => x < walkingDistancesTo).map(distance => (
                        <option key={distance} value={distance}>{distance} km</option>
                    ))}
                </select>
            </div>

            <div className="item">
                <label htmlFor="difficultyCode">Pěší vzdálenost do</label>
                <select name="walkingDistancesTo" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWalkingDistancesTo(Number(e.target.value))} defaultValue={defaultFilter.walkingDistancesTo}>
                    {availableOptions.walkingDistances.filter(x => x > walkingDistancesFrom).map(distance => (
                        <option key={distance} value={distance}>{distance} km</option>
                    ))}
                </select>
            </div>
        </form>
    ) : null;
}
