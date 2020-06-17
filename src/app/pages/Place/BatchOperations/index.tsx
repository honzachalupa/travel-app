import PlacesActions from 'Actions/places';
import { EColors } from 'Components/Button';
import Navigation from 'Components/Navigation';
import { RoutesLabels } from 'Enums/RoutesLabels';
import AcceptIcon from 'Icons/accept.svg';
import { IPlaceRemote } from 'Interfaces/Place';
import Layout from 'Layouts/WithSpacing';
import React, { useEffect, useState } from 'react';

export default () => {
    const [placesCount, setPlacesCount] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    const handleSubmit = () => {
        PlacesActions.get((places) => {
            setPlacesCount(places.length);

            places.forEach((place: IPlaceRemote) => {
                setProgress(progress + 1);

                PlacesActions.update(place.id, { isPromoted: false });
            });
        });
    };

    useEffect(() => {
        console.log(progress, placesCount, progress === placesCount);

        if (placesCount > 0 && progress === placesCount) {
            alert('Operation finished!');
        }
    }, [progress]);

    return (
        <Layout title={RoutesLabels.PLACE_BATCH_OPERATIONS}>
            <div data-component="Page_PlaceImport">
                <Navigation
                    items={[{
                        label: 'Spustit',
                        icon: AcceptIcon,
                        color: EColors.RED,
                        onClick: handleSubmit
                    }]}
                    singleItemAlignment="right"
                />
            </div>
        </Layout>
    );
};
