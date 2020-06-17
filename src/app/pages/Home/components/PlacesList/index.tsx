import { Context } from '@honzachalupa/helpers';
import { ELoadingStates } from 'Enums/LoadingStates';
import { IContext } from 'Interfaces/Context';
import { IPlace } from 'Interfaces/Place';
import React, { useContext } from 'react';
import PlaceItem from './components/PlaceItem';
import './style';

interface IProps {
    places: IPlace[];
}

export default ({ places }: IProps) => {
    const { placesLoadingState } = useContext(Context) as IContext;

    return (
        <div data-component="PlacesList">
            {placesLoadingState === ELoadingStates.LOADED ? (
                places.map((place, i: number) => (
                    <PlaceItem key={place.id} place={place} i={i} />
                ))
            ) : placesLoadingState === ELoadingStates.LOADING || placesLoadingState === ELoadingStates.WAITING ? (
                <p className="message loading">Vybíráme pro Vás ta nejhezčí místa...</p>
            ) : placesLoadingState === ELoadingStates.NO_DATA ? (
                <p className="message no-data">Nebyla nalezena žádná místa dle vašich kritérií.</p>
            ) : (
                <p className="message error">Při stahování dat došlo k chybě.</p>
            )}
        </div>
    )
};
