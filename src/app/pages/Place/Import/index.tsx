import { Context } from '@honzachalupa/helpers';
import { EColors } from 'Components/Button';
import Navigation from 'Components/Navigation';
import { Routes } from 'Enums/Routes';
import { Database } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import { IPlace, IPlaceWithId } from 'Interfaces/Place';
import Layout from 'Layouts/Main';
import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import importData from './data';
import './style';

export default withRouter(({ history }: RouteComponentProps) => {
    const { places } = useContext(Context) as IContext;

    const handleSubmit = () => {
        places.forEach((place: IPlaceWithId) => {
            Database.places.doc(place.id).delete();
        });

        importData.forEach((place: IPlace) => {
            Database.places.add(place);
        });

        history.push(Routes.ROOT);
    };

    return (
        <Layout>
            <div data-component="Page_PlaceImport">
                <Navigation
                    items={[{
                        label: 'Importovat',
                        icon: '+',
                        color: EColors.RED,
                        onClick: handleSubmit
                    }]}
                    singleItemAlignment="right"
                />
            </div>
        </Layout>
    );
});
