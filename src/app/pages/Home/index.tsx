import React, { useContext, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import cx from 'classnames';
import { Context } from '@honzachalupa/helpers';
import Layout from 'Layouts/Homepage';
import Navigation from 'Components/Navigation';
import { IContext } from 'Interfaces/Context';
import { Routes } from 'Enums/Routes';
import Button from 'Components/Button';
import Map from 'Components/Map';
import { usePosition } from 'use-position';

export default withRouter(({ history }: RouteComponentProps) => {
    const { places } = useContext(Context) as IContext;
    const { latitude, longitude } = usePosition(true);
    const [ isMapExpanded, setMapExpanded ] = useState<boolean>(false);

    return (
        <Layout className={cx({ 'is-scrolling-disabled': isMapExpanded })}>
            <Navigation />

            {(latitude && longitude) && (
                <div className={cx('my-location-map', { 'is-expanded': isMapExpanded })}>
                    <Map
                        markers={places}
                        defaultZoom={15}
                        defaultPosition={{
                            latitude,
                            longitude
                        }}
                    />

                    <Button className="toggle-button" label={isMapExpanded ? 'A': 'V'} onClick={() => setMapExpanded(!isMapExpanded)} />
                </div>
            )}

            <div className={cx('places-list', { 'is-faded': isMapExpanded })}>
                {places.map(({ id, name, description }) => (
                    <div key={id} className="place" onClick={() => history.push(Routes.LOCATION_DETAIL.replace(':id', id))}>
                        <h3 className="name">{name}</h3>

                        <div className="details">
                            <img className="image" src={`https://i.picsum.photos/id/10/360/240.jpg`} />
                            <p className="description">{description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Button className="add-button" label="+" onClick={() => history.push(Routes.LOCATION_CREATE)} />
        </Layout>
    );
});
