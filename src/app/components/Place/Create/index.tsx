import React, { useState } from 'react';
import { Database } from 'Helpers';
import { IPlace } from 'Interfaces/Place';
import './style';
import { IRegion } from 'Interfaces/Region';
import { IArea } from 'Interfaces/SubRegion';
import { IDifficulty } from 'Interfaces/Difficulty';
import { Regions } from 'Enums/regions';
import { Areas } from 'Enums/areas';
import Button from 'Components/Button';
import { Difficulties } from 'Enums/Difficulties';

export default () => {
    const [place, setPlace] = useState<IPlace>({
        name: `Název místa (${Math.random()})`,
        description: 'Popis...',
        coordinates: {
            latitude: 50.16591 - Math.random(),
            longitude: 14.08412 - Math.random(),
        },
        regionCode: Regions[0].id,
        areaCode: Areas[0].id,
        rating: 0,
        comments: [],
        instagramPosts: [],
        accessibility: {
            walkingDistance: 200 * Math.random(),
            difficultyCode: Difficulties[0].id
        },
        tags: []
    });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(place);

        Database.places.add(place);
    };

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

    return (
        <form className="form" data-component="Place_Create" onSubmit={handleAdd}>
            <label htmlFor="name">Název</label>
            <input name="name" type="text" onChange={(e: any) => setPlaceProperty('name', e.target.value)} defaultValue={place.name} />

            <label htmlFor="description">Popis</label>
            <textarea name="description" onChange={(e: any) => setPlaceProperty('description', e.target.value)} defaultValue={place.description} />

            <label htmlFor="latitude">Latitude</label>
            <input name="latitude" type="number" step="0.000001" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaceProperty('coordinates.latitude', Number(e.target.value))} defaultValue={place.coordinates.latitude} />

            <label htmlFor="longitude">Longitude</label>
            <input name="longitude" type="number" step="0.000001" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaceProperty('coordinates.longitude', Number(e.target.value))} defaultValue={place.coordinates.longitude} />

            <label htmlFor="region">Kraj</label>
            <select name="region" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPlaceProperty('regionCode', e.target.value)} defaultValue={place.regionCode}>
                <option id="none">-</option>

                {Regions.map((region: IRegion) => (
                    <option key={region.id} value={region.id}>{region.label}</option>
                ))}
            </select>

            <label htmlFor="area">Oblast</label>
            <select name="area" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPlaceProperty('areaCode', e.target.value)} defaultValue={place.areaCode}>
                <option id="none">-</option>

                {Areas.map((subregion: IArea) => (
                    <option key={subregion.id} value={subregion.id}>{subregion.label}</option>
                ))}
            </select>

            <label htmlFor="walkingDistance">Pěší vzdálenost (např. od parkoviště)</label>
            <input name="walkingDistance" type="number" step={0.1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaceProperty('walkingDistance', Number(e.target.value))} defaultValue={place.accessibility.walkingDistance} />

            <label htmlFor="difficultyCode">Obtížnost</label>
            <select name="difficultyCode" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPlaceProperty('accessibility.difficultyCode', e.target.value)} defaultValue={place.accessibility.difficultyCode}>
                <option id="none">-</option>

                {Difficulties.map((difficulty: IDifficulty) => (
                    <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>
                ))}
            </select>

            <Button type="submit" label="Přidat místo" className="green" />
        </form>
    );
};
