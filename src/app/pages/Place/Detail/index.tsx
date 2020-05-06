import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Database } from 'Helpers';
import { IPlaceWithId } from 'Interfaces/Place';
import { Difficulties } from 'Enums/Difficulties';
import './style';
import Layout from 'Layouts/Main';
import Map from 'Components/Map';
import PostsGrid from './components/PostsGrid';
import { ButtonWithIcon, EColors } from 'Components/Button';
import { Routes } from 'Enums/Routes';

export default withRouter(({ history, match }: RouteComponentProps) => {
    const [place, setPlace] = useState<IPlaceWithId | null>(null);

    const getPlace = () => {
        // @ts-ignore
        const unsubscribe = Database.places.doc(match.params.id).onSnapshot(doc => {
            if (doc.data()) {
                setPlace({
                    ...doc.data(),
                    id: doc.id
                } as IPlaceWithId);
            }

            unsubscribe();
        });
    };

    useEffect(() => {
        getPlace();
    });

    const findInEnum = (enumerator: any, key: string) => enumerator.find((x: typeof enumerator) => x.id === key) || { label: null };

    return place ? (
        <Layout>
            <div data-component="Page_PlaceDetail">
                <Map
                    markers={[place]}
                    initialPosition={{
                        latitude: place.coordinates.latitude,
                        longitude: place.coordinates.longitude
                    }}
                />

                <div className="content">
                    <div className="info">
                        <h1 className="name">{place.name}</h1>
                        <p className="description">{place.description}</p>
                    </div>

                    <div className="details">
                        <p>Hodnocení: {place.rating}</p>
                        <p>Pěší vzdálenost: {place.accessibility.walkingDistance} km</p>
                        <p>Obtížnost terénu: {findInEnum(Difficulties, place.accessibility.difficultyCode).label}</p>
                    </div>

                    {place.instagramPosts && (
                        <PostsGrid urls={place.instagramPosts} />
                    )}
                </div>

                <ButtonWithIcon className="back-button" label="Zpět" icon="<" onClick={() => history.goBack()} />
                <ButtonWithIcon className="navigate-button" label="Navigovat" icon="N" color={EColors.BLUE} onClick={() => window.location.href = `http://maps.google.com/maps?daddr=${place.coordinates.latitude},${place.coordinates.longitude}`} />
                <ButtonWithIcon className="edit-button" label="Upravit" icon="#" color={EColors.GREEN} onClick={() => history.push(Routes.PLACE_EDIT)} />
                <ButtonWithIcon className="remove-button" label="Smazat" icon="X" color={EColors.RED} onClick={() => null} />
            </div>
        </Layout>
    ) : null;
});
