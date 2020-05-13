import { Context } from '@honzachalupa/helpers';
import { EColors } from 'Components/Button';
import Navigation from 'Components/Navigation';
import { ECountryCodes } from 'Enums/CountryCodes';
import { DifficultyCodes } from 'Enums/Difficulties';
import { calculateDistance, Database } from 'Helpers';
import AcceptIcon from 'Icons/accept.svg';
import { IContext } from 'Interfaces/Context';
import { IPlacePartial, IPlaceRemote } from 'Interfaces/Place';
import Layout from 'Layouts/Main';
import React, { useContext, useEffect } from 'react';
import rawData from './data';
import './style';

export default () => {
    const { places } = useContext(Context) as IContext;

    const formatData = (data: any) => {
        const formatted: IPlacePartial[] = [];

        data.features.forEach((place: any) => {
            formatted.push({
                name: place.properties.Name,
                description: '',
                coordinates: {
                    latitude: place.geometry.coordinates[1],
                    longitude: place.geometry.coordinates[0]
                },
                countryCode: calculateDistance({ latitude: place.geometry.coordinates[1], longitude: place.geometry.coordinates[0] }) < 350 ? ECountryCodes.CZ : null,
                rating: {
                    value: 3,
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
                updatesHistory: [],
                usersVisited: []
            });
        });

        return formatted;
    };

    const handleSubmit = () => {
        let count = 0;

        places.forEach((place: IPlaceRemote) => {
            Database.places.doc(place.id).delete();
        });

        formatData(rawData).forEach((place: IPlacePartial) => {
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
};
