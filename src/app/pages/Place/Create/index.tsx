import React, { useState, useEffect } from 'react';
import Layout from 'Layouts/Main';
import './style';
import { IPlace, ICoordinates } from 'Interfaces/Place';
import { Difficulties } from 'Enums/Difficulties';
import { Database } from 'Helpers';
import { IDifficulty, DifficultyCodes } from 'Interfaces/Difficulty';
import { ButtonWithIcon, EColors } from 'Components/Button';
import Map from 'Components/Map';
import { withRouter, RouteComponentProps } from 'react-router-dom';

enum ValidationState {
    VALID = 'VALID',
    INVALID = 'INVALID'
}

export default withRouter(({ history }: RouteComponentProps) => {
    const [validationState, setValidationState] = useState<ValidationState>(ValidationState.INVALID);
    const [selectedCoordinates, setSelectedCoordinates] = useState<ICoordinates>({ latitude: 0, longitude: 0});

    const [place, setPlace] = useState<IPlace>({
        name: '',
        description: '',
        coordinates: selectedCoordinates,
        rating: 0,
        comments: [],
        images: [],
        instagramPosts: [],
        accessibility: {
            walkingDistance: 0,
            difficultyCode: Difficulties[0].id
        },
        tags: []
    });

    const setPlaceProperty = (propertyKey: string, value: any) => {
        if (propertyKey.includes('.')) {
            setPlace(place => ({
                ...place,
                [propertyKey.split('.')[0]]: {
                    ...place[propertyKey.split('.')[0]],
                    [propertyKey.split('.')[1]]: value
                }
            }));
        } else {
            setPlace(place => ({
                ...place,
                [propertyKey]: value
            }));
        }
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        const placeClone = { ...place };

        placeClone.coordinates = selectedCoordinates;

        Database.places.add(placeClone);
    };

    useEffect(() => {
        const isValid =
            place.name.length > 5 &&
            place.description.length > 10 &&
            place.accessibility.walkingDistance > 0 &&
            place.accessibility.difficultyCode !== DifficultyCodes.NONE &&
            selectedCoordinates.latitude > 0 &&
            selectedCoordinates.longitude > 0;

        setValidationState(isValid ? ValidationState.VALID : ValidationState.INVALID);
    }, [place, selectedCoordinates]);

    return (
        <Layout>
            <div data-component="Page_PlaceCreate">
                <form className="form">
                    <label htmlFor="name">Název</label>
                    <input name="name" type="text" onChange={(e: any) => setPlaceProperty('name', e.target.value)} defaultValue={place.name} />

                    <label htmlFor="description">Popis</label>
                    <textarea name="description" onChange={(e: any) => setPlaceProperty('description', e.target.value)} defaultValue={place.description} />

                    <label htmlFor="walkingDistance">Pěší vzdálenost (např. od parkoviště)</label>
                    <input name="walkingDistance" type="number" step={0.1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaceProperty('accessibility.walkingDistance', Number(e.target.value))} defaultValue={place.accessibility.walkingDistance} />

                    <label htmlFor="difficultyCode">Obtížnost</label>
                    <select name="difficultyCode" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPlaceProperty('accessibility.difficultyCode', e.target.value)} defaultValue={place.accessibility.difficultyCode}>
                        {Difficulties.map((difficulty: IDifficulty) => (
                            <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>
                        ))}
                    </select>

                    <Map onMapClick={setSelectedCoordinates} />

                    <ButtonWithIcon className="back-button" label="Zpět" icon="<" onClick={() => history.goBack()} />
                    <ButtonWithIcon className="submit-button" label="Přidat" icon="#" color={EColors.GREEN} isDisabled={validationState === ValidationState.INVALID} onClick={handleAdd} />
                </form>
            </div>
        </Layout>
    );
});
