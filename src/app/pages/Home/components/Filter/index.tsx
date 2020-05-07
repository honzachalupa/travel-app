import { Context } from '@honzachalupa/helpers';
import { Difficulties } from 'Enums/Difficulties';
import { findInEnum, removeDuplicates } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { DifficultyCodes } from 'Interfaces/Difficulty';
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
    const { places } = useContext(Context) as IContext;

    const walkingDistances = [0.1, 0.25, 0.5, 1, 2.5, 5, 7.5, 10, 15, 20];

    const defaultFilter = {
        difficultyCode: DifficultyCodes.NONE,
        walkingDistancesFrom: walkingDistances[0],
        walkingDistancesTo: walkingDistances[walkingDistances.length - 1]
    };

    const [prevPlaces, setPrevPlaces] = useState<IPlace[] | undefined>();

    const [availableOptions, setAvailableOptions] = useState<IAvailableOptions | null>(null);
    const [difficultyCode, setDifficultyCode] = useState<DifficultyCodes | undefined>();
    const [walkingDistancesFrom, setWalkingDistancesFrom] = useState<number | undefined>();
    const [walkingDistancesTo, setWalkingDistancesTo] = useState<number | undefined>();

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
        if (prevPlaces !== places) {
            getFilterData(places);
            setPrevPlaces(places);
        }
    }, [places]);


    useEffect(() => {
        if (difficultyCode && walkingDistancesFrom && walkingDistancesTo) {
            props.onFilterChange({
                _isFilterActive:
                    difficultyCode !== defaultFilter.difficultyCode ||
                    walkingDistancesFrom !== defaultFilter.walkingDistancesFrom ||
                    walkingDistancesTo !== defaultFilter.walkingDistancesTo,
                difficultyCode,
                walkingDistancesFrom,
                walkingDistancesTo
            });
        }
    }, [difficultyCode, walkingDistancesFrom, walkingDistancesTo]);

    return availableOptions && difficultyCode && walkingDistancesFrom && walkingDistancesTo ? (
        <form data-component="Filter">
            <select name="difficultyCode" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDifficultyCode(e.target.value as DifficultyCodes)} defaultValue={defaultFilter.difficultyCode}>
                <option value={DifficultyCodes.NONE}>Všechny</option>

                {availableOptions.difficultyCodes.map(code => (
                    <option key={code} value={code}>{findInEnum(Difficulties, code).label}</option>
                ))}
            </select>

            <select name="walkingDistancesFrom" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWalkingDistancesFrom(Number(e.target.value))} defaultValue={defaultFilter.walkingDistancesFrom}>
                {availableOptions.walkingDistances.filter(x => x < walkingDistancesTo).map(distance => (
                    <option key={distance} value={distance}>{distance} km</option>
                ))}
            </select>

            <select name="walkingDistancesTo" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWalkingDistancesTo(Number(e.target.value))} defaultValue={defaultFilter.walkingDistancesTo}>
                {availableOptions.walkingDistances.filter(x => x > walkingDistancesFrom).map(distance => (
                    <option key={distance} value={distance}>{distance} km</option>
                ))}
            </select>
        </form>
    ) : null;
}
