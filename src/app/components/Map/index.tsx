// import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import config from 'config';
import CurrentLocationIcon from 'Icons/current-location.svg';
import PlaceIcon from 'Icons/place.svg';
import { ICoordinates, IPlaceWithId } from 'Interfaces/Place';
import React, { useState } from 'react';
import { GoogleMap, GoogleMapProps, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { usePosition } from 'use-position';
import './style';

interface IProps {
    markers?: IPlaceWithId[],
    initialZoom?: number;
    initialPosition?: {
        latitude: number;
        longitude: number;
    };
    onMapClick?: (coordinates: ICoordinates) => void;
    onPlaceClick?: (place: IPlaceWithId) => void;
    isCurrentPositionHidden?: boolean
}

export default (props: IProps) => (
    <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.googleCloudKey}&libraries=places`}
        loadingElement={<span />}
        containerElement={<div data-component="Map" />}
        mapElement={<div className="map-container" />}
        {...props}
    />
);

const Map = withScriptjs(withGoogleMap((props: GoogleMapProps & IProps) => {
    const currentLocation = usePosition(true);
    const [selectedPoint, setSelectedPoint] = useState<ICoordinates | null>(null);

    const config = {
        defaultZoom: 15
    };

    const handleMapClick = (e: any) => {
        if (props.onMapClick) {
            const coordinatesObject = {
                longitude: e.latLng.lng(),
                latitude: e.latLng.lat()
            };

            setSelectedPoint(coordinatesObject);

            props.onMapClick(coordinatesObject);
        }
    };

    const handlePlaceClick = (place: IPlaceWithId) => {
        if (props.onPlaceClick) {
            props.onPlaceClick(place);
        }
    };

    const getMarkerCoordinates = (place: ICoordinates) => ({ lat: place.latitude, lng: place.longitude });

    return currentLocation.latitude && currentLocation.longitude ? (
        <GoogleMap
            defaultZoom={props.initialZoom || config.defaultZoom}
            defaultCenter={{
                lat: props.initialPosition ? props.initialPosition.latitude : currentLocation.latitude + 0.0006,
                lng: props.initialPosition ? props.initialPosition.longitude : currentLocation.longitude
            }}
            defaultOptions={{
                fullscreenControl: false,
                disableDefaultUI: true,
                gestureHandling: 'greedy'
            }}
            clickableIcons={false}
            onClick={handleMapClick}
        >
            {!props.isCurrentPositionHidden && (
                <Marker
                    position={getMarkerCoordinates(currentLocation)}
                    icon={{
                        url: CurrentLocationIcon,
                        scaledSize: new google.maps.Size(40, 40)
                    }}
                    animation={google.maps.Animation.DROP}
                />
            )}

            {selectedPoint && (
                <Marker
                    position={getMarkerCoordinates(selectedPoint)}
                    icon={{
                        url: PlaceIcon,
                        scaledSize: new google.maps.Size(40, 40)
                    }}
                    animation={google.maps.Animation.DROP}
                />
            )}

            {props.markers && props.markers.length > 0 && props.markers.map((marker) => (
                <Marker
                    key={marker.id}
                    position={getMarkerCoordinates(marker.coordinates)}
                    icon={{
                        url: PlaceIcon,
                        scaledSize: new google.maps.Size(40, 40)
                    }}
                    animation={google.maps.Animation.DROP}
                    onClick={() => handlePlaceClick(marker)}
                />
            ))}
        </GoogleMap>
    ) : null;
}));
