import { Context } from '@honzachalupa/helpers';
import PlacesActions from 'Actions/places';
import { RoutesLabels } from 'Enums/RoutesLabels';
import { IContext } from 'Interfaces/Context';
import { IPlace, IPlaceRemote } from 'Interfaces/Place';
import Layout from 'Layouts/WithSpacing';
import PlacesList from 'Pages/Home/components/PlacesList';
import React, { useContext, useEffect, useState } from 'react';
import './style';

export default () => {
    const { setLoadingState } = useContext(Context) as IContext;
    const [places, setPlaces] = useState<IPlaceRemote[]>([]);

    useEffect(() => {
        PlacesActions.get(setPlaces, setLoadingState, [
            ['isArchived', '==', true]
        ]);
    }, []);

    return (
        <Layout title={`${RoutesLabels.ADMINISTRATION_PLACES_ARCHIVED} (${places.length} míst)`}>
            <div data-component="Page_PlacesArchived">
                <PlacesList places={places.sort((a: IPlaceRemote, b: IPlaceRemote) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0) as IPlace[]} />
            </div>
        </Layout>
    );
};