// import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import cx from 'classnames';
import config from 'config';
import CurrentLocationIcon from 'Icons/current-location.svg';
import PlaceIconFaded from 'Icons/place-faded.svg';
import PlaceIcon from 'Icons/place.svg';
import { ICoordinates, IPlaceWithId } from 'Interfaces/Place';
import React, { useState } from 'react';
import { GoogleMap, GoogleMapProps, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { usePosition } from 'use-position';
import './style';

interface IProps {
    places?: IPlaceWithId[],
    filteredIds?: string[] | null;
    initialZoom?: number;
    initialPosition?: {
        latitude: number;
        longitude: number;
    };
    isFullWidth?: boolean;
    onMapClick?: (coordinates: ICoordinates) => void;
    onPlaceClick?: (place: IPlaceWithId) => void;
    isCurrentPositionHidden?: boolean
}

export default (props: IProps) => (
    <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.googleCloudKey}&libraries=places`}
        loadingElement={<span />}
        containerElement={<div data-component="Map" className={cx({ 'is-full-width': props.isFullWidth })} />}
        mapElement={<div className="map-container-inner" />}
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
                />
            )}

            {selectedPoint && (
                <Marker
                    position={getMarkerCoordinates(selectedPoint)}
                    icon={{
                        url: PlaceIcon,
                        scaledSize: new google.maps.Size(40, 40)
                    }}
                />
            )}

            {props.places && props.places.length > 0 && props.places.map((place) => {
                const faded = props.filteredIds ? !props.filteredIds.includes(place.id) : false;

                return (
                    <Marker
                        key={place.id}
                        position={getMarkerCoordinates(place.coordinates)}
                        icon={{
                            url: faded ? PlaceIconFaded : PlaceIcon,
                            scaledSize: new google.maps.Size(faded ? 20 : 40, faded ? 20 : 40)
                        }}
                        onClick={() => handlePlaceClick(place)}
                    />
                );
            })}
        </GoogleMap>
    ) : null;
}));
