import { Context } from '@honzachalupa/helpers';
import PlacesActions from 'Actions/places';
import RatingsActions from 'Actions/ratings';
import UserActions from 'Actions/users';
import VisitsActions from 'Actions/visits';
import cx from 'classnames';
import { ButtonWithIcon, EColors } from 'Components/Button';
import Map from 'Components/Map';
import Navigation from 'Components/Navigation';
import config from 'config';
import { Difficulties, DifficultyCodes } from 'Enums/Difficulties';
import { ERoles } from 'Enums/Roles';
import { Routes } from 'Enums/Routes';
import { findInEnum, hasRole } from 'Helpers';
import ArrowDownIcon from 'Icons/arrow-down.svg';
import ArrowUpIcon from 'Icons/arrow-up.svg';
import RemoveIcon from 'Icons/bin.svg';
import UncheckIcon from 'Icons/cross.svg';
import EditIcon from 'Icons/edit.svg';
import NavigateIcon from 'Icons/navigation.svg';
import CheckIcon from 'Icons/plus.svg';
import { IContext } from 'Interfaces/Context';
import { IPlaceRemote } from 'Interfaces/Place';
import { IUser } from 'Interfaces/User';
import Layout from 'Layouts/WithoutSpacing';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Textfit } from 'react-textfit';
// import ImagesGrid from './components/ImagesGrid';
import PostsGrid from './components/PostsGrid';
import Rating from './components/Rating';
import './style';


export default withRouter(({ history, match }: RouteComponentProps & { match: { params: { id: string }} }) => {
    const { currentUser } = useContext(Context) as IContext;
    const [isMapExpanded, setMapExpanded] = useState<boolean>(false);
    const [place, setPlace] = useState<IPlaceRemote | null>(null);
    const [addedByUser, setAddedByUser] = useState<IUser | null>(null);
    const [hasEditRights, setHasEditRights] = useState<boolean>(false);
    const [isVisited, setIsVisited] = useState<boolean>(false);

    const handleToggleVisitedState = () => {
        if (place) {
            VisitsActions.set(place.id, !isVisited);

            if (isVisited) {
                RatingsActions.delete(place.id);
            }
        }
    }

    const handleArchive = () => {
        if (place) {
            PlacesActions.archive(place.id);

            history.goBack();
        }
    };

    const handleUnarchive = () => {
        if (place) {
            PlacesActions.unarchive(place.id);
        }
    };

    useEffect(() => {
        PlacesActions.getById(match.params.id, setPlace);
    }, []);

    useEffect(() => {
        if (place && currentUser) {
            document.title = `${config.name} | ${place.name}`;

            setHasEditRights(!!(
                hasRole(currentUser, ERoles.ADMIN) ||
                (currentUser && currentUser.uid && place.addedBy.id === currentUser.uid)
            ));

            VisitsActions.getById(place.id, setIsVisited);
            UserActions.getById(place.addedBy.id, setAddedByUser);
        }
    }, [place]);

    const getSourceDomain = (url: string) => {
        const matches = url.match(/https?:\/\/(.+?)\//i);

        return matches ? matches[1].toLowerCase() : '';
    };

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
                        isDistanceShown
                    />

                    <ButtonWithIcon
                        className="toggle-map-button"
                        icon={isMapExpanded ? ArrowUpIcon : ArrowDownIcon}
                        color={EColors.ORANGE}
                        onClick={() => setMapExpanded(!isMapExpanded)}
                    />
                </div>

                <div className="content">
                    <Textfit className="name" mode="single" max={24}>
                        {place.name}
                    </Textfit>

                    <h3 className="headline">O místě</h3>
                    <p className="description">{place.description.value || 'Popisek k tomuto místu zatím nebyl vytvořen.'}</p>

                    {place.description.source && (
                        <p className="description-source">
                            <span>Zdroj: </span>
                            <a className="url" href={place.description.source}>{getSourceDomain(place.description.source)}</a>
                        </p>
                    )}

                    {(
                        place.accessibility.walkingDistance > 0 ||
                        place.accessibility.difficultyCode !== DifficultyCodes.NONE ||
                        (hasRole(currentUser, ERoles.ADMIN) && addedByUser)
                    ) && (
                        <React.Fragment>
                            <h3 className="headline">Podrobnosti</h3>
                            {place.accessibility.walkingDistance > 0 && (
                                <p className="item"><span className="label">Pěší vzdálenost:</span> {place.accessibility.walkingDistance} km</p>
                            )}

                            {place.accessibility.difficultyCode !== DifficultyCodes.NONE && (
                                <p className="item"><span className="label">Obtížnost terénu:</span> {findInEnum(Difficulties, place.accessibility.difficultyCode).label}</p>
                            )}

                            {(hasRole(currentUser, ERoles.ADMIN) && addedByUser) && (
                                <p className="item"><span className="label">Autor:</span> {addedByUser.emailAddress}</p>
                            )}
                        </React.Fragment>
                    )}

                    {place && (
                        <div className="rating-container">
                            <h3 className="headline">Hodnocení</h3>

                            <Rating placeId={place.id} isVisited={isVisited} />

                            {!isVisited && (
                                <p className="note">Místo můžete hodnotit až tehdy, kdy ho navštívíte.</p>
                            )}
                        </div>
                    )}

                    {/* place.images.length > 0 && (
                        <ImagesGrid images={place.images} />
                    ) */}

                    {place.instagramPosts.length > 0 && (
                        <React.Fragment>
                            <h3 className="headline">Vaše IG příspěvky</h3>
                            <PostsGrid urls={place.instagramPosts} />
                        </React.Fragment>
                    )}

                    {place.websites.length > 0 && (
                        <React.Fragment>
                            <h3 className="headline">Odkazy</h3>
                            {place.websites.map(website => (
                                <a key={website} href={website}>{website.replace(/https?:\/\//, '').replace(/\/$/, '')}</a>
                            ))}
                        </React.Fragment>
                    )}
                </div>

                <Navigation
                    items={[{
                        label: 'Navigovat',
                        icon: NavigateIcon,
                        color: EColors.BLUE,
                        isHidden: place.isArchived,
                        onClick: () => window.location.href = `http://maps.google.com/maps?daddr=${place.coordinates.latitude},${place.coordinates.longitude}`
                    }, {
                        label: 'Upravit',
                        icon: EditIcon,
                        color: EColors.GREEN,
                        isHidden: !hasEditRights || place.isArchived,
                        onClick: () => history.push(Routes.PLACE_EDIT.replace(':id', place.id))
                    }, {
                        label: isVisited ? 'Nenavštíveno' : 'Navštíveno',
                        icon: isVisited ? UncheckIcon : CheckIcon,
                        color: EColors.GREEN,
                        isHidden: !currentUser || place.isArchived,
                        onClick: handleToggleVisitedState
                    }, {
                        label: 'Smazat',
                        icon: RemoveIcon,
                        color: EColors.RED,
                        isHidden: !hasEditRights || place.isArchived,
                        onClick: handleArchive
                    }, {
                        label: 'Obnovit',
                        icon: RemoveIcon,
                        color: EColors.GREEN,
                        isHidden: !hasEditRights || !place.isArchived,
                        onClick: handleUnarchive
                    }]}
                    singleItemAlignment="right"
                />
            </div>
        </Layout>
    ) : null;
});
