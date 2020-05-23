import { Context } from '@honzachalupa/helpers';
import { Difficulties, DifficultyCodes } from 'Enums/Difficulties';
import { ELoadingStates } from 'Enums/LoadingStates';
import { Routes } from 'Enums/Routes';
import { findInEnum, formatDistance } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { IPlace } from 'Interfaces/Place';
import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import './style';

interface IProps extends RouteComponentProps {
    places: IPlace[];
}

export default withRouter((props: IProps) => {
    const { placesLoadingState } = useContext(Context) as IContext;

    return (
        <div data-component="PlacesList">
            {placesLoadingState === ELoadingStates.LOADED ? (
                props.places.map(place => (
                    <div key={place.id} className="item" onClick={() => props.history.push(Routes.PLACE_DETAIL.replace(':id', place.id))}>
                        <h3 className="name">
                            <Textfit mode="single" max={20}>
                                {place.name}{place.distance ? <span className="distance"> ({formatDistance(place.distance)})</span> : null}
                            </Textfit>
                        </h3>

                        {place.images.length > 0 && (
                            <img className="image" src={place.images[0]} />
                        )}

                        <div className="details">
                            {!!place.accessibility.walkingDistance && (
                                <p className="item"><span className="label">Pěší vzdálenost:</span> {place.accessibility.walkingDistance} km</p>
                            )}

                            {place.accessibility.difficultyCode !== DifficultyCodes.NONE && (
                                <p className="item"><span className="label">Obtížnost terénu:</span> {findInEnum(Difficulties, place.accessibility.difficultyCode).label}</p>
                            )}
                        </div>
                    </div>
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
});
