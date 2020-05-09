import { Context } from '@honzachalupa/helpers';
import { EColors } from 'Components/Button';
import Navigation from 'Components/Navigation';
import config from 'config';
import { DifficultyCodes } from 'Enums/Difficulties';
import { Database } from 'Helpers';
import AcceptIcon from 'Icons/accept.svg';
import { IContext } from 'Interfaces/Context';
import { IPlace, IPlaceWithId } from 'Interfaces/Place';
import Layout from 'Layouts/Main';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import rawData from './data';
import './style';

export default withRouter(({ history }: RouteComponentProps) => {
    const { places } = useContext(Context) as IContext;

    const formatData = (data: any) => {
        const formatted: IPlace[] = [];

        data.features.forEach((place: any) => {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${place.geometry.coordinates[0]},${place.geometry.coordinates[1]}&key=${config.googleCloudKey}`)

            formatted.push({
                name: place.properties.Name,
                description: place.properties.description ? place.properties.description : '',
                coordinates: {
                    longitude: place.geometry.coordinates[0],
                    latitude: place.geometry.coordinates[1]
                },
                countryCode: '',
                rating: {
                    value: 0,
                    count: 0
                },
                images: [],
                instagramPosts: [],
                accessibility: {
                    walkingDistance: 0,
                    difficultyCode: DifficultyCodes.DIFFICULTY_1
                },
                tags: [],
                websites: [],
                tripIds: [],
                addedBy: {
                    id: 'IMPORT',
                    timestamp: Database.getTimestamp()
                },
                updatesHistory: []
            });
        });

        return formatted;
    };

    const handleSubmit = () => {
        let count = 0;

        places.forEach((place: IPlaceWithId) => {
            Database.places.doc(place.id).delete();
        });

        formatData(rawData).forEach((place: IPlace) => {
            Database.places.add(place);

            count += 1;

        });

        alert(`Import in progress (${count} items).`)
    };

    useEffect(() => {
        if (places.length > 0) {
            // console.log('Current data:', JSON.stringify(places));
        }
    }, [places]);

    return (
        <Layout>
            <div data-component="Page_PlaceImport">
                <Navigation
                    items={[{
                        label: 'Přepsat aktuální data?!',
                        icon: AcceptIcon,
                        color: EColors.RED,
                        onClick: handleSubmit
                    }]}
                    singleItemAlignment="right"
                />
            </div>
        </Layout>
    );
});
