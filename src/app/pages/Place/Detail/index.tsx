import { ButtonWithIcon, EColors } from 'Components/Button';
import Map from 'Components/Map';
import { Difficulties } from 'Enums/Difficulties';
import { Routes } from 'Enums/Routes';
import { Database } from 'Helpers';
import { DifficultyCodes } from 'Interfaces/Difficulty';
import { IPlaceWithId } from 'Interfaces/Place';
import Layout from 'Layouts/Main';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { Textfit } from 'react-textfit';
import PostsGrid from './components/PostsGrid';
import './style';

export default withRouter(({ history, match }: RouteComponentProps) => {
    const [place, setPlace] = useState<IPlaceWithId>({
        id: '',
        name: '',
        description: '',
        coordinates: {
            latitude: -1,
            longitude: -1
        },
        rating: {
            value: 0,
            count: 0
        },
        images: [],
        instagramPosts: [],
        accessibility: {
            walkingDistance: 0,
            difficultyCode: DifficultyCodes.NONE
        },
        tags: []
    });

    const getPlace = () => {
        // @ts-ignore
        Database.places.doc(match.params.id).onSnapshot(doc => {
            if (doc.data()) {
                setPlace({
                    ...doc.data(),
                    id: doc.id
                } as IPlaceWithId);
            }
        });
    };

    const getRatingStars = (value: number, count: number) =>
        value > 0 && count > 0 ?
            Math.round(value / count) :
            0;

    const handleRatingChange = (ratedValue: any) => {
        Database.places.doc(place.id).set({
            ...place,
            rating: {
                value: place.rating.value + ratedValue,
                count: place.rating.count + 1
            }
        });
    }

    useEffect(() => {
        getPlace();
    });

    const findInEnum = (enumerator: any, key: string) => enumerator.find((x: typeof enumerator) => x.id === key) || { label: null };

    return (
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
                        <h1 className="name">
                            <Textfit mode="single" max={24}>
                                {place.name}
                            </Textfit>
                        </h1>

                        <p className="description">{place.description}</p>
                    </div>

                    <div className="details">
                        <p>Pěší vzdálenost: {place.accessibility.walkingDistance} km</p>
                        <p>Obtížnost terénu: {findInEnum(Difficulties, place.accessibility.difficultyCode).label}</p>

                        <StarRatings
                            rating={getRatingStars(place.rating.value, place.rating.count)}
                            starRatedColor="#0fd99f"
                            changeRating={handleRatingChange}
                        />
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
    );
});
