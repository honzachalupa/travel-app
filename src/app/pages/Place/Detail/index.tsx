import cx from 'classnames';
import { ButtonWithIcon, EColors } from 'Components/Button';
import Map from 'Components/Map';
import Navigation from 'Components/Navigation';
import { Difficulties, DifficultyCodes } from 'Enums/Difficulties';
import { Routes } from 'Enums/Routes';
import { Database, findInEnum } from 'Helpers';
import ArrowDownIcon from 'Icons/arrow-down.svg';
import ArrowUpIcon from 'Icons/arrow-up.svg';
import RemoveIcon from 'Icons/bin.svg';
import EditIcon from 'Icons/edit.svg';
import NavigateIcon from 'Icons/navigation.svg';
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
    const [isMapExpanded, setMapExpanded] = useState<boolean>(false);
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
        tags: [],
        websites: [],
        addedBy: {
            id: 'SYSTEM',
            timestamp: ''
        },
        updatesHistory: []
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

    const handleRemove = () => {
        Database.places.doc(place.id).delete();

        history.goBack();
    };

    useEffect(() => {
        getPlace();
    }, []);

    return (
        <Layout>
            <div data-component="Page_PlaceDetail" className={cx({ 'is-map-expanded': isMapExpanded })}>
                <div className={cx('map-container', { 'is-expanded': isMapExpanded })}>
                    <Map
                        places={[place]}
                        initialPosition={{
                            latitude: place.coordinates.latitude,
                            longitude: place.coordinates.longitude
                        }}
                        isFullWidth
                    />

                    <ButtonWithIcon
                        className="toggle-map-button"
                        icon={isMapExpanded ? ArrowUpIcon : ArrowDownIcon}
                        color={EColors.ORANGE}
                        onClick={() => setMapExpanded(!isMapExpanded)}
                    />
                </div>

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

                    {/* place.images.length > 0 && (
                        <ImagesGrid images={place.images} />
                    ) */}

                    {place.instagramPosts.length > 0 && (
                        <React.Fragment>
                            <h3 className="subheadline" style={{ paddingLeft: 22 }}>Vaše IG příspěvky</h3>
                            <PostsGrid urls={place.instagramPosts} />
                        </React.Fragment>
                    )}
                </div>

                <Navigation
                    items={[{
                        label: 'Navigovat',
                        icon: NavigateIcon,
                        color: EColors.BLUE,
                        onClick: () => window.location.href = `http://maps.google.com/maps?daddr=${place.coordinates.latitude},${place.coordinates.longitude}`
                    }, {
                        label: 'Upravit',
                        icon: EditIcon,
                        color: EColors.GREEN,
                        onClick: () => history.push(Routes.PLACE_EDIT)
                    }, {
                        label: 'Smazat',
                        icon: RemoveIcon,
                        color: EColors.RED,
                        onClick: handleRemove
                    }]}
                />
            </div>
        </Layout>
    );
});
