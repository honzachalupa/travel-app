import { Context } from '@honzachalupa/helpers';
import { EColors } from 'Components/Button';
import Navigation from 'Components/Navigation';
import { Database } from 'Helpers';
import AcceptIcon from 'Icons/accept.svg';
import { IContext } from 'Interfaces/Context';
import { IPlaceRemote } from 'Interfaces/Place';
import Layout from 'Layouts/WithSpacing';
import React, { useContext } from 'react';

export default () => {
    const { places } = useContext(Context) as IContext;

    const handleSubmit = () => {
        places.forEach((place: IPlaceRemote) => {
            Database.places.doc(place.id).delete();
            Database.visits.doc(place.id).delete();
            Database.ratings.doc(place.id).delete();
        });
    };

    return (
        <Layout title="Hromadné operace">
            <div data-component="Page_PlaceImport">
                <Navigation
                    items={[{
                        label: 'Spustit',
                        icon: AcceptIcon,
                        color: EColors.RED,
                        onClick: handleSubmit
                    }]}
                    singleItemAlignment="right"
                />
            </div>
        </Layout>
    );
};
