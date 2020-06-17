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

export default withRouter(({ places, history }: IProps) => {
    const { visits, placesLoadingState, currentUser } = useContext(Context) as IContext;

    return (
        <div data-component="PlacesList">
            {placesLoadingState === ELoadingStates.LOADED ? (
                places.map((place, i: number) => {
                    const isVisited = visits && currentUser && visits[place.id] ? visits[place.id].includes(currentUser.uid) : false;

                    return (
                        <div key={place.id} className="item" onClick={() => history.push(Routes.PLACE_DETAIL.replace(':id', place.id))}>
                            <h3 className="header">
                                <Textfit className="name" mode="single" max={22}>{place.name}</Textfit>

                                {place.distance && (
                                    <p className="distance">{i === 0 ? `Vzdáleno ${formatDistance(place.distance)} od vás` : formatDistance(place.distance)}</p>
                                )}
                            </h3>

                            {place.description.value && (
                                <p className="description">
                                    {place.description.value}
                                </p>
                            )}

                            {(!!place.accessibility.walkingDistance || place.accessibility.difficultyCode !== DifficultyCodes.NONE) && (
                                <div className="details">
                                    {!!place.accessibility.walkingDistance && (
                                        <p className="item"><span className="label">Pěší vzdálenost:</span> {place.accessibility.walkingDistance} km</p>
                                    )}

                                    {place.accessibility.difficultyCode !== DifficultyCodes.NONE && (
                                        <p className="item"><span className="label">Obtížnost terénu:</span> {findInEnum(Difficulties, place.accessibility.difficultyCode).label}</p>
                                    )}
                                </div>
                            )}

                            {isVisited ? (
                                <p className="info-box is-visited">Navštíveno</p>
                            ) : place.isPromoted ? (
                                <p className="info-box is-promoted">Náš tip</p>
                            ) : null}
                        </div>
                    );
                })
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
