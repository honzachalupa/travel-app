import React, { useContext } from 'react';
import { Context } from '@honzachalupa/helpers';
import Layout from 'Layouts/Homepage';
import Navigation from 'Components/Navigation';
import SidePanel from 'Components/SidePanel';
import Map from 'Components/Map';
import config from 'config';
import { IContext } from 'Interfaces/Context';

export default () => {
    const { places } = useContext(Context) as IContext;

    return (
        <Layout>
            <Navigation />
            <SidePanel />

            <Map
                markers={places}
                defaultZoom={config.mapConfig.defaultZoom}
                defaultPosition={{
                    latitude: config.mapConfig.defaultPosition.latitude,
                    longitude: config.mapConfig.defaultPosition.longitude
                }}
            />
        </Layout>
    );
};
