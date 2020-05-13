import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import { ButtonWithIcon, EColors } from 'Components/Button';
import Map from 'Components/Map';
import Navigation from 'Components/Navigation';
import { Difficulties } from 'Enums/Difficulties';
import { ERoles } from 'Enums/Roles';
import { Routes } from 'Enums/Routes';
import { Database, findInEnum, getIsVisited, hasRole } from 'Helpers';
import ArrowDownIcon from 'Icons/arrow-down.svg';
import ArrowUpIcon from 'Icons/arrow-up.svg';
import RemoveIcon from 'Icons/bin.svg';
import UncheckIcon from 'Icons/cross.svg';
import EditIcon from 'Icons/edit.svg';
import NavigateIcon from 'Icons/navigation.svg';
import CheckIcon from 'Icons/plus.svg';
import { IContext } from 'Interfaces/Context';
import { IPlace, IPlaceRemote } from 'Interfaces/Place';
import Layout from 'Layouts/Main';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { Textfit } from 'react-textfit';
// import ImagesGrid from './components/ImagesGrid';
import PostsGrid from './components/PostsGrid';
import './style';

export default withRouter(({ history, match }: RouteComponentProps) => {
    const { currentUser } = useContext(Context) as IContext;
    const [isMapExpanded, setMapExpanded] = useState<boolean>(false);
    const [place, setPlace] = useState<IPlaceRemote | null>(null);
    const [hasEditRights, setHasEditRights] = useState<boolean>(false);
    const [isVisited, setIsVisited] = useState<boolean>(false);

    const getPlace = () => {
        // @ts-ignore
        Database.places.doc(match.params.id).onSnapshot(doc => {
            const place = doc.data() as IPlace;

            if (place) {
                setPlace({
                    ...place,
                    id: doc.id
                } as IPlaceRemote);

                setHasEditRights(hasRole(currentUser, ERoles.SUPER_USER) || (!!currentUser && place.addedBy.id === currentUser.uid));
                setIsVisited(getIsVisited(place, currentUser));
            }
        });
    };

    const getRatingStars = (value: number, count: number) =>
        value > 0 && count > 0 ?
            Math.round(value / count) :
            0;

    const handleRatingChange = (ratedValue: any) => {
        if (place) {
            Database.places.doc(place.id).set({
                ...place,
                rating: {
                    value: place.rating.value + ratedValue,
                    count: place.rating.count + 1
                }
            });
        }
    }

    const handleToggleVisitedState = () => {
        if (place) {
            if (isVisited) {
                Database.places.doc(place.id).set({
                    ...place,
                    usersVisited: place.usersVisited.filter(emailAddress => emailAddress !== currentUser.email)
                });
            } else {
                Database.places.doc(place.id).set({
                    ...place,
                    usersVisited: [...place.usersVisited, currentUser.email]
                });
            }
        }
    }

    const handleRemove = () => {
        if (place) {
            Database.places.doc(place.id).delete();

            history.goBack();
        }
    };

    useEffect(() => {
        getPlace();
    }, [currentUser]);

    return place ? (
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
                        <p className="description">{place.description || 'Popisek k tomuto místu zatím nebyl vytvořen.'}</p>
                    </div>

                    <div className="details">
                        <h3 className="subheadline">Podrobnosti</h3>
                        <p className="item"><span className="label">Pěší vzdálenost:</span> {place.accessibility.walkingDistance} km</p>
                        <p className="item"><span className="label">Obtížnost terénu:</span> {findInEnum(Difficulties, place.accessibility.difficultyCode).label}</p>

                        {isVisited && (
                            <React.Fragment>
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
                            </React.Fragment>
                        )}
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
                    }, hasEditRights ? {
                        label: 'Upravit',
                        icon: EditIcon,
                        color: EColors.GREEN,
                        onClick: () => history.push(Routes.PLACE_EDIT.replace(':id', place.id))
                    } : null, hasEditRights ? {
                        label: isVisited ? 'Nenavštíveno' : 'Navštíveno',
                        icon: isVisited ? UncheckIcon : CheckIcon,
                        color: EColors.GREEN,
                        onClick: handleToggleVisitedState
                    } : null, hasEditRights ? {
                        label: 'Smazat',
                        icon: RemoveIcon,
                        color: EColors.RED,
                        onClick: handleRemove,
                        isDisabled: true
                    } : null]}
                    singleItemAlignment="right"
                />
            </div>
        </Layout>
    ) : null;
});
