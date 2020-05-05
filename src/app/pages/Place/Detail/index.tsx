import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Database } from 'Helpers';
import { ILocationWithId } from 'Interfaces/Place';
import { Regions } from 'Enums/regions';
import { Areas } from 'Enums/areas';
import { Difficulties } from 'Enums/Difficulties';
import './style';
import Layout from 'Layouts/Main';
import Map from 'Components/Map';
import PostsGrid from './components/PostsGrid';

export default withRouter(({ match: { params: { id } } }: RouteComponentProps<{ id: string }>) => {
    const [place, setPlace] = useState<ILocationWithId | null>(null);

    const getPlace = () => {
        const unsubscribe = Database.places.doc(id).onSnapshot(doc => {
            if (doc.data()) {
                setPlace({
                    ...doc.data(),
                    id: doc.id
                } as ILocationWithId);
            }

            unsubscribe();
        });
    };

    useEffect(() => {
        getPlace();
    });

    const findInEnum = (enumerator: any, key: string) => enumerator.find((x: typeof enumerator) => x.id === key) || { label: null };

    return place ? (
        <Layout className="Page_LocationDetail">
            <Map
                markers={[place]}
                defaultZoom={12}
                defaultPosition={{
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
                    <p>Region: {findInEnum(Regions, place.regionCode).label}</p>
                    <p>Oblast: {findInEnum(Areas, place.areaCode).label}</p>
                    <p>Pěší vzdálenost: {place.accessibility.walkingDistance} km</p>
                    <p>Obtížnost terénu: {findInEnum(Difficulties, place.accessibility.difficultyCode).label}</p>
                </div>

                {place.instagramPosts && (
                    <PostsGrid urls={place.instagramPosts} />
                )}
            </div>
        </Layout>
    ) : null;
});
