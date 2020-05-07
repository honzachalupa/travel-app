import { Routes } from 'Enums/Routes';
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
            <div key={place.id} className="place" onClick={() => props.history.push(Routes.PLACE_DETAIL.replace(':id', place.id))}>
                <h3 className="name">
                    <Textfit mode="single" max={20}>
                        {place.name}<span className="distance"> ({place.distance} km)</span>
                    </Textfit>
                </h3>

                <div className="details">
                    <img className="image" src={place.images[0]} />
                    <p className="description">{place.description}</p>
                </div>
            </div>
        ))}
    </div>
));
