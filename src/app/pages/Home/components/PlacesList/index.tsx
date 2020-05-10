import { Difficulties } from 'Enums/Difficulties';
import { Routes } from 'Enums/Routes';
import { findInEnum } from 'Helpers';
import { IPlaceWithIdWithDistance } from 'Interfaces/Place';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import './style';

interface IProps extends RouteComponentProps {
    places: IPlaceWithIdWithDistance[];
}

export default withRouter((props: IProps) => (
    <div data-component="PlacesList">
        {props.places.map(place => (
            <div key={place.id} className="item" onClick={() => props.history.push(Routes.PLACE_DETAIL.replace(':id', place.id))}>
                <h3 className="name">
                    <Textfit mode="single" max={20}>
                        {place.name}<span className="distance"> ({place.distance} km)</span>
                    </Textfit>
                </h3>

                {place.images.length > 0 && (
                    <img className="image" src={place.images[0]} />
                )}

                <p className="description">{place.description || 'Popisek k tomuto místu zatím nebyl vytvořen.'}</p>

                <div className="details">
                    {!!place.accessibility.walkingDistance && (
                        <p className="item"><span className="label">Pěší vzdálenost:</span> {place.accessibility.walkingDistance} km</p>
                    )}

                    <p className="item"><span className="label">Obtížnost terénu:</span> {findInEnum(Difficulties, place.accessibility.difficultyCode).label}</p>
                </div>
            </div>
        ))}
    </div>
));
