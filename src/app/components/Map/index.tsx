import React from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap, GoogleMapProps } from 'react-google-maps';
import { ILocationWithId } from 'Interfaces/Place';
import './style';

interface IProps {
    markers: ILocationWithId[],
    defaultZoom: number;
    defaultPosition: any;
}

const Map = withScriptjs(withGoogleMap((props: GoogleMapProps & IProps) => (
    <GoogleMap
        defaultZoom={props.defaultZoom}
        defaultCenter={{
            lat: props.defaultPosition.latitude,
            lng: props.defaultPosition.longitude
        }}
    >
        {props.markers.length > 0 && props.markers.map(({ id, coordinates: { latitude, longitude } }) => (
            <Marker key={id} position={{ lat: latitude, lng: longitude }} />
        ))}
    </GoogleMap>
)));

export default (props: IProps) => (
    <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5XArugOE_gbteyws5tHht5yGzH-TzT_M"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div data-component="Map" />}
        mapElement={<div className="map-container" />}
        {...props}
    />
);
