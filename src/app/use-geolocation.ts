import config from 'config';
import geolocator from 'geolocator';
import { ICoordinates } from 'Interfaces/Place';
import { useEffect, useState } from 'react';

export default () => {
    const [coordinates, setCoordinates] = useState<ICoordinates>({
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {
        geolocator.config({
            language: "cs",
            google: {
                version: "3",
                key: config.googleCloudKey
            }
        });

        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumWait: 10000,
            maximumAge: 5000,
            desiredAccuracy: 30,
            fallbackToIP: true,
            addressLookup: true
        };

        geolocator.locate(options, (error: any, { coords, timestamp }: any) => {
            if (error) {
                console.error(error);
            } else {
                setCoordinates({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    timestamp
                });
            }
        });
    }, []);

    if (coordinates.latitude > 0 && coordinates.longitude > 0) {
        return coordinates;
    } else {
        return {};
    }
}
