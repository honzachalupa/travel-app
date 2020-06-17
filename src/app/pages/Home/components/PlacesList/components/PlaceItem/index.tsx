import { Difficulties, DifficultyCodes } from 'Enums/Difficulties';
import { Routes } from 'Enums/Routes';
import { findInEnum, formatDistance } from 'Helpers';
import { IPlace } from 'Interfaces/Place';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import PropertiesList from './components/PropertiesList';
import './style';

interface IProps extends RouteComponentProps {
    place: IPlace;
    i: number;
}

export default withRouter(({ place, i, history }: IProps) => (
    <div  data-component="PlaceItem" onClick={() => history.push(Routes.PLACE_DETAIL.replace(':id', place.id))}>
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

        <PropertiesList place={place} />
    </div>
));
