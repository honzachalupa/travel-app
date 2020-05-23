import { Context } from '@honzachalupa/helpers';
import { EColors } from 'Components/Button';
import Navigation from 'Components/Navigation';
import { Difficulties } from 'Enums/Difficulties';
import { ERoles } from 'Enums/Roles';
import { Database, hasRole } from 'Helpers';
import AcceptIcon from 'Icons/accept.svg';
import CrossIcon from 'Icons/cross.svg';
import { IContext } from 'Interfaces/Context';
import { IPlaceRemote } from 'Interfaces/Place';
import Layout from 'Layouts/WithSpacing';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './style';

enum ValidationState {
    VALID = 'VALID',
    INVALID = 'INVALID'
}

export default withRouter(({ history, match }: RouteComponentProps) => {
    const { currentUser } = useContext(Context) as IContext;
    // const inputElementRef = useRef(null);
    const [validationState, setValidationState] = useState<ValidationState>(ValidationState.INVALID);
    // const [selectedCoordinates, setSelectedCoordinates] = useState<ICoordinates>({ latitude: 0, longitude: 0});
    const [instagramPostsString, setInstagramPostsString] = useState<string>('');
    const [websitesString, setWebsitesString] = useState<string>('');
    const [images /* , setImages */] = useState<string[]>([]);
    const [place, setPlace] = useState<IPlaceRemote | null>(null);

    const getPlace = () => {
        // @ts-ignore
        Database.places.doc(match.params.id).onSnapshot(doc => {
            const place = doc.data();

            if (place) {
                setPlace({
                    ...place,
                    id: doc.id
                } as IPlaceRemote);
            }
        });
    };

    const setPlaceProperty = (propertyKey: string, value: any) => {
        if (propertyKey.includes('.')) {
            setPlace(place => place ? ({
                ...place,
                [propertyKey.split('.')[0]]: {
                    ...place[propertyKey.split('.')[0]],
                    [propertyKey.split('.')[1]]: value
                }
            }) : null);
        } else {
            setPlace(place => place ? ({
                ...place,
                [propertyKey]: value
            }) : null);
        }
    };

    const handleSubmit = () => {
        if (place) {
            const placeClone = { ...place };

            // placeClone.coordinates = selectedCoordinates;
            placeClone.websites = websitesString.split(',').map(url => url.trim()).filter(x => x.length > 0);
            placeClone.instagramPosts = instagramPostsString.split(',').map(url => url.trim()).filter(x => x.length > 0);
            placeClone.images = images;

            delete placeClone.id;

            Database.places.doc(place.id).set(placeClone);

            history.goBack();
        }
    };

    useEffect(() => {
        getPlace();
    }, []);

    useEffect(() => {
        if (place) {
            const isValid =
                place.name.length > 2 // &&
                // place.description.length > 10 &&
                // place.accessibility.walkingDistance > 0 &&
                // place.accessibility.difficultyCode !== DifficultyCodes.NONE &&
                // selectedCoordinates.latitude > 0 &&
                // selectedCoordinates.longitude > 0;

            setValidationState(isValid ? ValidationState.VALID : ValidationState.INVALID);
        }
    }, [place /*, selectedCoordinates */]);

    return place ? (
        <Layout title="Upravit">
            <div data-component="Page_PlaceEdit">
                <form className="form">
                    <label htmlFor="name">Název</label>
                    <input name="name" type="text" onChange={(e: any) => setPlaceProperty('name', e.target.value)} defaultValue={place.name} />

                    <label htmlFor="descriptionValue">Popis</label>
                    <textarea name="descriptionValue" onChange={(e: any) => setPlaceProperty('description.value', e.target.value)} defaultValue={place.description.value} />

                    <label htmlFor="descriptionSource">Zdroj popisu</label>
                    <input name="descriptionSource" type="text" onChange={(e: any) => setPlaceProperty('description.source', e.target.value)} defaultValue={place.description.source} />

                    <label htmlFor="walkingDistance">Pěší vzdálenost v km (např. od parkoviště)</label>
                    <input name="walkingDistance" type="number" step={0.5} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaceProperty('accessibility.walkingDistance', Number(e.target.value))} defaultValue={place.accessibility.walkingDistance} />

                    <label htmlFor="difficultyCode">Obtížnost</label>
                    <select name="difficultyCode" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPlaceProperty('accessibility.difficultyCode', e.target.value)} defaultValue={place.accessibility.difficultyCode}>
                        {Difficulties.map(difficulty => (
                            <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>
                        ))}
                    </select>

                    <label htmlFor="websites">Odkazy na web</label>
                    <textarea name="websites" onChange={(e: any) => setWebsitesString(e.target.value)} defaultValue={place.websites.join(',')} />

                    <label htmlFor="instagramPosts">Odkazy na IG</label>
                    <textarea name="instagramPosts" onChange={(e: any) => setInstagramPostsString(e.target.value)} defaultValue={place.instagramPosts.join(',')} />

                    {hasRole(currentUser, ERoles.ADMIN) && (
                        <React.Fragment>
                            <label htmlFor="isPublished">Publikováno</label>
                            <select name="isPublished" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPlaceProperty('isPublished', e.target.value === 'true')} defaultValue={place.isPublished.toString()}>
                                <option value="true">Ano</option>
                                <option value="false">Ne</option>
                            </select>
                        </React.Fragment>
                    )}
                </form>

                <Navigation
                    items={[{
                        label: 'Zpět',
                        icon: CrossIcon,
                        color: EColors.ORANGE,
                        onClick: () => history.goBack()
                    }, {
                        label: 'Uložit',
                        icon: AcceptIcon,
                        color: EColors.GREEN,
                        isDisabled: validationState === ValidationState.INVALID,
                        onClick: handleSubmit
                    }]}
                />
            </div>
        </Layout>
    ) : null;
});
