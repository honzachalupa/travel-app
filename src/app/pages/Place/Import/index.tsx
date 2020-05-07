import { Context } from '@honzachalupa/helpers';
import { EColors } from 'Components/Button';
import Navigation from 'Components/Navigation';
import { calculateDistance, Database } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { IPlace, IPlaceWithId } from 'Interfaces/Place';
import Layout from 'Layouts/Main';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { usePosition } from 'use-position';
import importData from './data';
import './style';

export default withRouter(({ history }: RouteComponentProps) => {
    const currentLocation = usePosition(true);
    const { places } = useContext(Context) as IContext;

    const handleSubmit = () => {
        let count = 0;

        places.forEach((place: IPlaceWithId) => {
            Database.places.doc(place.id).delete();
        });

        importData.forEach((place: IPlace) => {
            if (calculateDistance(place.coordinates, currentLocation) < 350) {
                Database.places.add(place);

                count += 1;
            }

        });

        alert(`Data imported (${count} items).`)
    };

    useEffect(() => {
        if (places.length > 0) {
            console.log('Current data:', JSON.stringify(places));
        }
    }, [places]);

    return (
        <Layout>
            <div data-component="Page_PlaceImport">
                <Navigation
                    items={[{
                        label: '(DISABLED) Přepsat aktuální data?!',
                        icon: '+',
                        color: EColors.RED,
                        isDisabled: true,
                        onClick: handleSubmit
                    }]}
                    singleItemAlignment="right"
                />
            </div>
        </Layout>
    );
});
