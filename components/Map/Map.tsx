"use client";

import { useGeoLocation } from "@/hooks/useGeoLocation";
import {
    CurrentLocationIcon,
    MarkerIcon,
    SetCurrentLocationIcon,
} from "@/icons";
import { Place } from "@/types/map";
import { usePreferredColorScheme } from "@react-hooks-library/core";
import cx from "classnames";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import MapGL, {
    MapLayerMouseEvent,
    MapRef,
    Marker,
    ViewStateChangeEvent,
} from "react-map-gl";
import { Coordinates } from "./Map.types";

interface Props {
    places: Place[];
    selectedPlaceId?: Place["id"];
    initialViewCoordinates?: {
        longitude?: Coordinates["longitude"];
        latitude?: Coordinates["latitude"];
    };
    initialViewZoom?: number;
    initialFitBounds?: boolean;
    className?: string;
    onClick?: (coordinates: Coordinates) => void;
    onPlaceClick?: (id: Place["id"]) => void;
}

const defaultZoom = 15;

export const Map: React.FC<Props> = ({
    places,
    selectedPlaceId,
    initialViewCoordinates,
    initialViewZoom,
    initialFitBounds,
    className,
    onClick,
    onPlaceClick,
}) => {
    const currentLocation = useGeoLocation();
    const colorScheme = usePreferredColorScheme();

    const [prevSelectedPlaceId, setPrevSelectedPlaceId] = useState<
        Place["id"] | null
    >();
    const [zoom, setZoom] = useState<number>(initialViewZoom || defaultZoom);

    const ref = useRef<MapRef>(null);

    const handleClick = ({ lngLat }: MapLayerMouseEvent) =>
        onClick?.({
            longitude: lngLat.lng,
            latitude: lngLat.lat,
        });

    const handlePlaceClick = (id: Place["id"]) => {
        onPlaceClick?.(id);
    };

    const handleFocusCurrentLocation = () => {
        ref.current?.flyTo({
            center: [currentLocation.longitude, currentLocation.latitude],
        });
    };

    const handleZoom = ({ viewState }: ViewStateChangeEvent) => {
        setZoom(viewState.zoom);
    };

    useEffect(() => {
        if (!selectedPlaceId) {
            const selectedPlace = places.find(
                (place) => place.id === prevSelectedPlaceId
            );

            if (selectedPlace) {
                ref.current?.flyTo({
                    center: [
                        selectedPlace.coordinates.longitude,
                        selectedPlace.coordinates.latitude,
                    ],
                });
            }

            setPrevSelectedPlaceId(null);
        } else {
            setPrevSelectedPlaceId(selectedPlaceId);
        }
    }, [selectedPlaceId]);

    useEffect(() => {
        if (selectedPlaceId) {
            const { coordinates } = places.find(
                (place) => place.id === selectedPlaceId
            )!;

            ref.current?.flyTo({
                center: [coordinates.longitude, coordinates.latitude],
                offset: [0, -140],
            });
        }
    }, [selectedPlaceId]);

    useEffect(() => {
        if (initialFitBounds && places.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();

            places.forEach((place) => {
                bounds.extend([
                    place.coordinates.longitude,
                    place.coordinates.latitude,
                ]);
            });

            ref.current?.fitBounds(bounds, {
                padding: 120,
                animate: false,
            });
        }
    }, [places, initialFitBounds]);

    return (
        <div className={cx("w-full h-full relative", className)}>
            {currentLocation ? (
                <>
                    <MapGL
                        ref={ref}
                        mapboxAccessToken={
                            process.env.NEXT_PUBLIC_MAPBOX_API_KEY
                        }
                        initialViewState={{
                            longitude:
                                initialViewCoordinates?.longitude ||
                                currentLocation.longitude,
                            latitude:
                                initialViewCoordinates?.latitude ||
                                currentLocation.latitude,
                            zoom: initialViewZoom || defaultZoom,
                        }}
                        mapStyle={`mapbox://styles/mapbox/${colorScheme}-v11`}
                        onZoom={handleZoom}
                        onClick={handleClick}
                    >
                        <Marker
                            longitude={currentLocation.longitude}
                            latitude={currentLocation.latitude}
                        >
                            <div className="w-5 aspect-square relative">
                                <CurrentLocationIcon className="w-full h-full fill-green-600 absolute" />
                                <CurrentLocationIcon className="w-full h-full fill-green-600 animate-ping absolute" />
                            </div>
                        </Marker>

                        {places.map(({ id, name, coordinates }) => (
                            <Marker
                                key={id}
                                longitude={coordinates.longitude}
                                latitude={coordinates.latitude}
                            >
                                <div
                                    className={cx(
                                        "flex flex-col items-center relative -top-4",
                                        {
                                            "cursor-pointer": onPlaceClick,
                                        }
                                    )}
                                    onClick={() => {
                                        handlePlaceClick(id);
                                    }}
                                >
                                    <MarkerIcon
                                        className={cx(
                                            "w-12 accent-foreground aspect-square transition-all",
                                            {
                                                "w-5":
                                                    selectedPlaceId &&
                                                    selectedPlaceId !== id,
                                            }
                                        )}
                                    />

                                    {name && zoom > 8 && <p>{name}</p>}
                                </div>
                            </Marker>
                        ))}
                    </MapGL>

                    <div
                        className="w-10 h-10 bg-black bg-opacity-20 backdrop-blur-md p-[10px] rounded-full absolute right-3 bottom-3 z-10"
                        onClick={handleFocusCurrentLocation}
                    >
                        <SetCurrentLocationIcon className="w-full h-full accent-foreground" />
                    </div>
                </>
            ) : (
                <p>Loading map...</p>
            )}
        </div>
    );
};
