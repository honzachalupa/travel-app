import { Context } from '@honzachalupa/helpers';
import { EColors } from 'Components/Button';
import Navigation from 'Components/Navigation';
import { DifficultyCodes } from 'Enums/Difficulties';
import { Database } from 'Helpers';
import AcceptIcon from 'Icons/accept.svg';
import { IContext } from 'Interfaces/Context';
import { IPlacePartial, IPlaceRemote } from 'Interfaces/Place';
import Layout from 'Layouts/WithSpacing';
import React, { useContext, useEffect, useState } from 'react';
import rawData from './data';
import './style';

export default () => {
    const { places } = useContext(Context) as IContext;
    const [formattedPlaces, setFormattedPlaces] = useState<IPlacePartial[]>([]);

    const formatData = (data: any) => {
        data.forEach((place: any) => {
            console.log({ place });

            fetch(`https://cors-anywhere.herokuapp.com/http://api.geonames.org/countryCodeJSON?lat=${place.geometry.coordinates[1]}&lng=${place.geometry.coordinates[0]}&username=janchalupa`)
                .then(response => response.json())
                .then(data => {
                    if (!data.hasOwnProperty('countryCode')) {
                        console.log({ place, data });
                    }

                    setFormattedPlaces(formattedPlaces => [
                        ...formattedPlaces,
                        {
                            name: place.properties.Name,
                            description: '',
                            coordinates: {
                                latitude: place.geometry.coordinates[1],
                                longitude: place.geometry.coordinates[0]
                            },
                            countryCode: data.hasOwnProperty('countryCode') ? data.countryCode : '',
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
                            usersVisited: [],
                            isPublished: false
                        } as IPlacePartial
                    ]);
                })
        });
    };

    const handleSubmit = () => {
        places.forEach((place: IPlaceRemote) => {
            Database.places.doc(place.id).delete();
        });

        formatData(rawData.features);
    };

    useEffect(() => {
        if (formattedPlaces.length === rawData.features.length) {
            console.log(formattedPlaces);

            formattedPlaces.forEach(place => {
                Database.places.add(place);
            });
        }
    }, [formattedPlaces]);

    return (
        <Layout title="Import">
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
