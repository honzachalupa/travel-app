"use client";

import { CurrentLocationIcon, SetCurrentLocationIcon } from "@/icons";
import { Place } from "@/types/map";
import { useGeoLocation } from "@honzachalupa/design-system";
import { usePreferredColorScheme } from "@react-hooks-library/core";
import cx from "classnames";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import MapGL, {
    MapLayerMouseEvent,
    MapRef,
    Marker,
    ViewStateChangeEvent,
} from "react-map-gl";
import { ContextMenu } from "../ContextMenu";
import { Coordinates } from "./Map.types";
import { PlaceMarker } from "./PlaceMarker";

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
    isReadonly?: boolean;
    isMapControlShown?: boolean;
    isPlaceVisited?: (placeId: Place["id"]) => boolean;
    onClick?: (coordinates: Coordinates) => void;
    onPlaceClick?: (id: Place["id"]) => void;
}

export interface MapRefProps {
    focusCurrentLocation: () => void;
    zoomToAllMarkers: () => void;
}

const defaultZoom = 15;

export const Map: React.FC<Props> = forwardRef(
    (
        {
            places,
            selectedPlaceId,
            initialViewCoordinates,
            initialViewZoom,
            initialFitBounds,
            className,
            isReadonly,
            isMapControlShown,
            isPlaceVisited,
            onClick,
            onPlaceClick,
        },
        ref
    ) => {
        const currentLocation = useGeoLocation();
        const colorScheme = usePreferredColorScheme();

        const [prevSelectedPlaceId, setPrevSelectedPlaceId] = useState<
            Place["id"] | null
        >();
        const [zoom, setZoom] = useState<number>(
            initialViewZoom || defaultZoom
        );

        const mapboxRef = useRef<MapRef>(null);

        const handleClick = ({ lngLat }: MapLayerMouseEvent) =>
            onClick?.({
                longitude: lngLat.lng,
                latitude: lngLat.lat,
            });

        const focusCurrentLocation = () => {
            mapboxRef.current?.flyTo({
                center: [currentLocation.longitude, currentLocation.latitude],
            });
        };

        const rotateToNorth = () => {
            mapboxRef.current?.rotateTo(0);
        };

        const handleZoom = ({ viewState }: ViewStateChangeEvent) => {
            setZoom(viewState.zoom);
        };

        const zoomToAllMarkers = () => {
            if (places.length > 0) {
                const bounds = new mapboxgl.LngLatBounds();

                places.forEach((place) => {
                    bounds.extend([
                        place.coordinates.longitude,
                        place.coordinates.latitude,
                    ]);
                });

                mapboxRef.current?.fitBounds(bounds, {
                    padding: 30,
                    animate: false,
                });
            }
        };

        useEffect(() => {
            if (!selectedPlaceId) {
                const selectedPlace = places.find(
                    (place) => place.id === prevSelectedPlaceId
                );

                if (selectedPlace) {
                    mapboxRef.current?.flyTo({
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

                mapboxRef.current?.flyTo({
                    center: [coordinates.longitude, coordinates.latitude],
                    offset: [0, -140],
                });
            }
        }, [selectedPlaceId]);

        useEffect(() => {
            if (initialFitBounds) {
                zoomToAllMarkers();
            }
        }, [places, initialFitBounds]);

        useEffect(() => {
            // console.log(isSetCurrentLocationButtonShown);
        }, []);

        useImperativeHandle(
            ref,
            (): MapRefProps => ({
                focusCurrentLocation,
                zoomToAllMarkers,
            })
        );

        return (
            <div
                className={cx(
                    "w-full h-full overflow-hidden relative",
                    {
                        "pointer-events-none": isReadonly,
                    },
                    className
                )}
            >
                {currentLocation ? (
                    <>
                        <MapGL
                            ref={mapboxRef}
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
                                    <CurrentLocationIcon className="w-full h-full fill-blue-600 absolute" />
                                    <CurrentLocationIcon className="w-full h-full fill-blue-600 animate-ping absolute" />
                                </div>
                            </Marker>

                            {places.map((place) => (
                                <PlaceMarker
                                    key={place.id}
                                    place={place}
                                    zoom={zoom}
                                    isVisited={
                                        isPlaceVisited?.(place.id) || false
                                    }
                                    isFaded={
                                        !!selectedPlaceId &&
                                        selectedPlaceId !== place.id
                                    }
                                    onClick={onPlaceClick}
                                />
                            ))}
                        </MapGL>

                        {isMapControlShown && (
                            <ContextMenu
                                title="Možnosti"
                                items={[
                                    {
                                        label: "Zobrazi mou polohu",
                                        onClick: focusCurrentLocation,
                                    },
                                    {
                                        label: "Zobrazit všechna místa na mapě",
                                        onClick: zoomToAllMarkers,
                                    },
                                    {
                                        label: "Otočit mapu na sever",
                                        onClick: rotateToNorth,
                                    },
                                ]}
                                itemsPosition={{
                                    x: "left",
                                    y: "top",
                                }}
                                className="absolute right-5 bottom-5"
                            >
                                <SetCurrentLocationIcon className="w-full h-full accent-foreground p-3" />
                            </ContextMenu>
                        )}
                    </>
                ) : (
                    <p>Loading map...</p>
                )}
            </div>
        );
    }
);

Map.displayName = "Map";
