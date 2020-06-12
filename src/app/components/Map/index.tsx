// import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import config from 'config';
import { EThemes } from 'Enums/Themes';
import { calculateDistance, formatDistance } from 'Helpers';
import CurrentLocationIcon from 'Icons/current-location.svg';
import PlaceIconFaded from 'Icons/place-faded.svg';
import PlaceIconVisited from 'Icons/place-visited.svg';
import PlaceIcon from 'Icons/place.svg';
import { IContext } from 'Interfaces/Context';
import { ICoordinates, IPlaceRemote } from 'Interfaces/Place';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GoogleMap, GoogleMapProps, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import './style';
import MapThemes from './themes';

interface IProps {
    places?: IPlaceRemote[],
    filteredIds?: string[] | null;
    initialZoom?: number;
    initialPosition?: {
        latitude: number;
        longitude: number;
    };
    isPoiVisible?: boolean;
    isFullWidth?: boolean;
    onMapClick?: (coordinates: ICoordinates) => void;
    onPlaceClick?: (place: IPlaceRemote) => void;
    isCurrentPositionHidden?: boolean;
    isDistanceShown?: boolean;
}

export default (props: IProps) => (
    <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.googleCloudKey}&libraries=places`}
        loadingElement={<div />}
        containerElement={<div data-component="Map" className={cx({ 'is-full-width': props.isFullWidth })} />}
        mapElement={<div className="map-container-inner" />}
        {...props}
    />
);

const Map = withScriptjs(withGoogleMap((props: GoogleMapProps & IProps) => {
    const config = {
        defaultZoom: 15
    };

    const mapRef = useRef(null);
    const { visits, currentLocation, currentUser, isDarkModeOn } = useContext(Context) as IContext;
    const [selectedPoint, setSelectedPoint] = useState<ICoordinates | null>(null);
    const [zoom, setZoom] = useState<number>(props.initialZoom || config.defaultZoom);
    const [markerSize, setMarkerSize] = useState<number>(40);
    const [isLockedToCurrentLocation, setIsLockedToCurrentLocation] = useState<boolean>(true);

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

    const handlePlaceClick = (place: IPlaceRemote) => {
        if (props.onPlaceClick) {
            props.onPlaceClick(place);
        }
    };

    const getMarkerCoordinates = (place: ICoordinates) => ({ lat: place.latitude, lng: place.longitude });

    const getMarkerSize = (isFilteredOut?: boolean, isVisited?: boolean) => {
        const size = isFilteredOut || isVisited ? markerSize / 2 : markerSize;

        return [size, size];
    };

    useEffect(() => {
        setMarkerSize(Math.min(zoom * 4, 40));
    }, [zoom]);

    return currentLocation.latitude && currentLocation.longitude ? (
        <GoogleMap
            key={isDarkModeOn.toString().length}
            ref={mapRef}
            defaultZoom={props.initialZoom || config.defaultZoom}
            defaultCenter={{
                lat: props.initialPosition ? props.initialPosition.latitude : currentLocation.latitude + 0.0006,
                lng: props.initialPosition ? props.initialPosition.longitude : currentLocation.longitude
            }}
            center={isLockedToCurrentLocation ? {
                lat: props.initialPosition ? props.initialPosition.latitude : currentLocation.latitude + 0.0006,
                lng: props.initialPosition ? props.initialPosition.longitude : currentLocation.longitude
            } : undefined}
            defaultOptions={{
                fullscreenControl: false,
                disableDefaultUI: true,
                gestureHandling: 'greedy',
                // @ts-ignore
                styles: [
                    ...MapThemes[isDarkModeOn ? EThemes.DARK : EThemes.LIGHT],
                    ...(
                        !props.isPoiVisible ? [{
                            featureType: 'poi',
                            elementType: 'labels',
                            stylers: [{
                                visibility: 'off'
                            }]
                        }, {
                            featureType: 'transit',
                            stylers: [
                              {
                                visibility: 'off'
                              }
                            ]
                        }]: []
                    )
                ]
            }}
            clickableIcons={false}
            onClick={handleMapClick}
            onDrag={() => setIsLockedToCurrentLocation(false)}
            // @ts-ignore
            onZoomChanged={() => setZoom(mapRef.current.getZoom())}
        >
            {(props.isDistanceShown && props.places) && (
                <div className="distance-container">
                    <p className="distance">Vzdálenost od vás: {formatDistance(calculateDistance(props.places[0].coordinates, currentLocation))}</p>
                </div>
            )}

            {!props.isCurrentPositionHidden && (
                <Marker
                    position={getMarkerCoordinates(currentLocation)}
                    icon={{
                        url: CurrentLocationIcon,
                        // @ts-ignore
                        scaledSize: new google.maps.Size(...getMarkerSize())
                    }}
                    zIndex={100}
                />
            )}

            {selectedPoint && (
                <Marker
                    position={getMarkerCoordinates(selectedPoint)}
                    icon={{
                        url: PlaceIcon,
                        // @ts-ignore
                        scaledSize: new google.maps.Size(...getMarkerSize())
                    }}
                />
            )}

            {props.places && props.places.length > 0 && props.places.map((place) => {
                const isFilteredOut = props.filteredIds ? !props.filteredIds.includes(place.id) : false;
                const isVisited = visits && currentUser && visits[place.id] ? visits[place.id].includes(currentUser.uid) : false;

                return (
                    <Marker
                        key={place.id}
                        position={getMarkerCoordinates(place.coordinates)}
                        icon={{
                            url: isVisited ? PlaceIconVisited : isFilteredOut ? PlaceIconFaded : PlaceIcon,
                            // @ts-ignore
                            scaledSize: new google.maps.Size(...getMarkerSize(isFilteredOut, isVisited))
                        }}
                        onClick={() => handlePlaceClick(place)}
                    />
                );
            })}
        </GoogleMap>
    ) : null;
}));
