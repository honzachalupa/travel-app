import { Database } from 'Helpers';
import { IPlace, IPlaceRemote } from 'Interfaces/Place';
import Layout from 'Layouts/Main';
import PlacesList from 'Pages/Home/components/PlacesList';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './style';

export default withRouter(({ history }: RouteComponentProps) => {
    const [places, setPlaces] = useState<IPlaceRemote[]>([]);

    useEffect(() => {
        Database.getPlaces(setPlaces);
    }, []);

    console.log(places);

    return (
        <Layout>
            <div data-component="Page_PlacesToEdit">
                <h1 className="headline">Místa k editaci</h1>

                <PlacesList places={places as IPlace[]} />
            </div>
        </Layout>
    );
});
