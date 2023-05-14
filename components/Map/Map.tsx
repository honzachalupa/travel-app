"use client";

import { PlacesContext } from "@/contexts/Places";
import { PointIcon, SetCurrentLocationIcon } from "@/icons";
import { IPlace } from "@/types/map";
import {
    useLocalStorage,
    usePreferredColorScheme,
} from "@honzachalupa/design-system";
import cx from "classnames";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
    forwardRef,
    useContext,
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
import { AppContext } from "../../contexts/App";
import { ContextMenu } from "../ContextMenu";
import { Coordinates } from "./Map.types";
import { PlaceMarker } from "./PlaceMarker";

interface IProps {
    places: IPlace[];
    selectedPlaceId?: IPlace["id"];
    initialViewCoordinates?: {
        longitude?: Coordinates["longitude"];
        latitude?: Coordinates["latitude"];
    };
    initialViewZoom?: number;
    initialFitBounds?: boolean;
    className?: string;
    isReadonly?: boolean;
    isMapControlShown?: boolean;
    onClick?: (coordinates: Coordinates) => void;
    onPlaceClick?: (id: IPlace["id"]) => void;
}

export interface IMapRefProps {
    focusCurrentLocation: (animate?: boolean) => void;
    zoomToAllMarkers: () => void;
}

const defaultZoom = 15;

export const Map: React.FC<IProps> = forwardRef(
    (
        {
            places,
            selectedPlaceId,
            initialViewCoordinates,
            initialViewZoom,
            initialFitBounds,
            className,
            isReadonly,
            isMapControlShown = true,
            onClick,
            onPlaceClick,
        },
        ref
    ) => {
        const { currentLocation } = useContext(AppContext);
        const { isPlaceVisited } = useContext(PlacesContext);
        const colorScheme = usePreferredColorScheme();

        const [prevSelectedPlaceId, setPrevSelectedPlaceId] = useState<
            IPlace["id"] | null
        >();
        const [zoom, setZoom] = useState<number>(
            initialViewZoom || defaultZoom
        );
        const [isSatelliteViewEnabled, setIsSatelliteViewEnabled] =
            useLocalStorage("isSatelliteViewEnabled", false);

        const mapboxRef = useRef<MapRef>(null);

        const handleClick = ({ lngLat }: MapLayerMouseEvent) =>
            onClick?.({
                longitude: lngLat.lng,
                latitude: lngLat.lat,
            });

        const focusCurrentLocation = (animate = true) => {
            mapboxRef.current?.flyTo({
                center: [
                    currentLocation.longitude || 0,
                    currentLocation.latitude || 0,
                ],
                zoom: 7,
                animate,
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
                if (places.length > 5) {
                    focusCurrentLocation(false);
                } else {
                    zoomToAllMarkers();
                }
            }
        }, [places, initialFitBounds]);

        useImperativeHandle(
            ref,
            (): IMapRefProps => ({
                focusCurrentLocation,
                zoomToAllMarkers,
            })
        );

        const mapStyle = {
            light: "mapbox://styles/mapbox/light-v11",
            dark: "mapbox://styles/mapbox/dark-v11",
            satellite: "mapbox://styles/mapbox/satellite-streets-v12",
        }[isSatelliteViewEnabled ? "satellite" : colorScheme];

        return (
            <div
                className={cx(
                    "overflow-hidden relative",
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
                                    currentLocation?.longitude ||
                                    0,
                                latitude:
                                    initialViewCoordinates?.latitude ||
                                    currentLocation?.latitude ||
                                    0,
                                zoom: initialViewZoom || defaultZoom,
                            }}
                            mapStyle={mapStyle}
                            onZoom={handleZoom}
                            onClick={handleClick}
                        >
                            <Marker
                                longitude={currentLocation.longitude || 0}
                                latitude={currentLocation.latitude || 0}
                            >
                                <div className="w-5 aspect-square relative">
                                    <PointIcon className="w-full h-full fill-blue-600 absolute" />
                                    <PointIcon className="w-full h-full fill-blue-600 animate-ping absolute" />
                                </div>
                            </Marker>

                            {places.map((place) => (
                                <PlaceMarker
                                    key={place.id}
                                    place={place}
                                    zoom={zoom}
                                    isSelected={selectedPlaceId === place.id}
                                    isVisited={isPlaceVisited(place.id)}
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
                                        label: "Zobrazit mou polohu",
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
                                    {
                                        label: isSatelliteViewEnabled
                                            ? "Skrýt satelitní snímky"
                                            : "Zobrazit satelitní snímky",
                                        onClick: () =>
                                            setIsSatelliteViewEnabled(
                                                !isSatelliteViewEnabled
                                            ),
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
