import PropertiesList, { EViews } from 'Components/PropertiesList';
import config from 'config';
import { Routes } from 'Enums/Routes';
import { formatDistance } from 'Helpers';
import useDimensions from 'Hooks/useDimensions';
import { IPlace } from 'Interfaces/Place';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import './style';

interface IProps extends RouteComponentProps {
    place: IPlace;
    i: number;
}

export default withRouter(({ place, i, history }: IProps) => {
    const { width } = useDimensions();

    return (
        <div  data-component="PlaceItem" onClick={() => history.push(Routes.PLACE_DETAIL.replace(':id', place.id))}>
            <h3 className="header">
                <Textfit className="name" mode="single" max={22}>{place.name}</Textfit>

                {place.distance && (
                    <p className="distance">{i === 0 ? `Vzdáleno ${formatDistance(place.distance)} od vás` : formatDistance(place.distance)}</p>
                )}
            </h3>

            {place.description.value && (
                <p className="description">{place.description.value}</p>
            )}

            <PropertiesList place={place} view={width < config.deviceBreakpoint ? EViews.INLINE : EViews.BLOCK} style={{ marginTop: 10 }} />
        </div>
    );
});
