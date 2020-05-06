import { EColors } from 'Components/Button';
import Map from 'Components/Map';
import Navigation from 'Components/Navigation';
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
// import ImagesGrid from './components/ImagesGrid';
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
    }, []);

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

                        <h3 className="subheadline">O místě</h3>
                        <p className="description">{place.description}</p>
                    </div>

                    <div className="details">
                        <h3 className="subheadline">Podrobnosti</h3>
                        <p className="item"><span className="label">Pěší vzdálenost:</span> {place.accessibility.walkingDistance} km</p>
                        <p className="item"><span className="label">Obtížnost terénu:</span> {findInEnum(Difficulties, place.accessibility.difficultyCode).label}</p>

                        <h3 className="subheadline">Hodnocení</h3>
                        <div className="rating-container">
                            <StarRatings
                                rating={getRatingStars(place.rating.value, place.rating.count)}
                                starRatedColor="#0fd99f"
                                starDimension="30px"
                                starSpacing="2px"
                                changeRating={handleRatingChange}
                            />

                            <p className="count">Hodnotilo {place.rating.count} uživatelů.</p>
                        </div>
                    </div>

                    {/* place.images && (
                        <ImagesGrid images={place.images} />
                    ) */}

                    <h3 className="subheadline" style={{ paddingLeft: 22 }}>Vaše IG příspěvky</h3>

                    {place.instagramPosts && (
                        <PostsGrid urls={place.instagramPosts} />
                    )}
                </div>

                <Navigation
                    items={[{
                        label: 'Zpět',
                        icon: '<',
                        color: EColors.ORANGE,
                        onClick: () => history.goBack()
                    }, {
                        label: 'Navigovat',
                        icon: 'N',
                        color: EColors.BLUE,
                        onClick: () => window.location.href = `http://maps.google.com/maps?daddr=${place.coordinates.latitude},${place.coordinates.longitude}`
                    }, {
                        label: 'Upravit',
                        icon: '#',
                        color: EColors.GREEN,
                        onClick: () => history.push(Routes.PLACE_EDIT)
                    }, {
                        label: 'Smazat',
                        icon: 'X',
                        color: EColors.RED,
                        onClick: () => history.goBack()
                    }]}
                />
            </div>
        </Layout>
    );
});
