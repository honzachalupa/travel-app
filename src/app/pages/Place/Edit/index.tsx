import { EColors } from 'Components/Button';
import Navigation from 'Components/Navigation';
import { Difficulties, DifficultyCodes } from 'Enums/Difficulties';
import { Routes } from 'Enums/Routes';
import { Database } from 'Helpers';
import AcceptIcon from 'Icons/accept.svg';
import RemoveIcon from 'Icons/bin.svg';
import CrossIcon from 'Icons/cross.svg';
import { IPlaceWithId } from 'Interfaces/Place';
import Layout from 'Layouts/Main';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './style';

enum ValidationState {
    VALID = 'VALID',
    INVALID = 'INVALID'
}

export default withRouter(({ history, match }: RouteComponentProps) => {
    // const inputElementRef = useRef(null);
    const [validationState, setValidationState] = useState<ValidationState>(ValidationState.INVALID);
    // const [selectedCoordinates, setSelectedCoordinates] = useState<ICoordinates>({ latitude: 0, longitude: 0});
    const [instagramPostsString, setInstagramPostsString] = useState<string>('');
    const [images /* , setImages */] = useState<string[]>([]);

    const [place, setPlace] = useState<IPlaceWithId | null>(null);

    const getPlace = () => {
        // @ts-ignore
        Database.places.doc(match.params.id).onSnapshot(doc => {
            const place = doc.data();

            if (place) {
                setPlace({
                    ...place,
                    id: doc.id
                } as IPlaceWithId);
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
            placeClone.instagramPosts = instagramPostsString.split(',').map(url => url.trim());
            placeClone.images = images;

            delete placeClone.id;

            Database.places.doc(place.id).set(placeClone);

            history.goBack();
        }
    };

    const handleRemove = () => {
        if (place) {
            Database.places.doc(place.id).delete();

            history.push(Routes.ROOT);
        }
    };

    useEffect(() => {
        getPlace();
    }, []);

    useEffect(() => {
        if (place) {
            const isValid =
                place.name.length > 2 &&
                // place.description.length > 10 &&
                place.accessibility.walkingDistance > 0 &&
                place.accessibility.difficultyCode !== DifficultyCodes.NONE /* &&
                selectedCoordinates.latitude > 0 &&
                selectedCoordinates.longitude > 0; */

            setValidationState(isValid ? ValidationState.VALID : ValidationState.INVALID);
        }
    }, [place /*, selectedCoordinates */]);

    return place ? (
        <Layout>
            <div data-component="Page_PlaceEdit">
                <form className="form">
                    <label htmlFor="name">Název</label>
                    <input name="name" type="text" onChange={(e: any) => setPlaceProperty('name', e.target.value)} defaultValue={place.name} />

                    <label htmlFor="description">Popis</label>
                    <textarea name="description" onChange={(e: any) => setPlaceProperty('description', e.target.value)} defaultValue={place.description} />

                    <label htmlFor="walkingDistance">Pěší vzdálenost (např. od parkoviště)</label>
                    <input name="walkingDistance" type="number" step={0.1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaceProperty('accessibility.walkingDistance', Number(e.target.value))} defaultValue={place.accessibility.walkingDistance} />

                    <label htmlFor="difficultyCode">Obtížnost</label>
                    <select name="difficultyCode" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPlaceProperty('accessibility.difficultyCode', e.target.value)} defaultValue={place.accessibility.difficultyCode}>
                        {Difficulties.map(difficulty => (
                            <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>
                        ))}
                    </select>

                    <label htmlFor="instagramPosts">Odkaz na post na Instagramu</label>
                    <textarea name="instagramPosts" onChange={(e: any) => setInstagramPostsString(e.target.value)} defaultValue={place.instagramPosts.join(',')} />
                </form>

                <Navigation
                    items={[{
                        label: 'Zpět',
                        icon: CrossIcon,
                        color: EColors.ORANGE,
                        onClick: () => history.goBack()
                    }, {
                        label: 'Smazat',
                        icon: RemoveIcon,
                        color: EColors.RED,
                        onClick: handleRemove
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