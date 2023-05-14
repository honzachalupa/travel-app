"use client";

import { SettingsContext } from "@/contexts/Settings";
import { SetCurrentLocationIcon } from "@/icons";
import { IPlace } from "@/types/map";
import {
    ICoordinates,
    IMapRefProps,
    IMarker,
    Map as MapCore,
} from "@honzachalupa/design-system";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { ContextMenu } from "../ContextMenu";
import { PlaceMarker } from "./PlaceMarker";

interface IProps {
    places: IPlace[];
    selectedPlaceId?: IPlace["id"];
    initialViewCoordinates?: {
        longitude?: ICoordinates["longitude"];
        latitude?: ICoordinates["latitude"];
    };
    initialViewZoom?: number;
    initialFitBounds?: boolean;
    className?: string;
    isReadonly?: boolean;
    isMapControlShown?: boolean;
    onClick?: (coordinates: ICoordinates) => void;
    onPlaceClick?: (id: IPlace["id"]) => void;
}

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
        const { isMapSatelliteViewEnabled, setMapSateliteViewEnabled } =
            useContext(SettingsContext);

        const mapRef = useRef<IMapRefProps>(null);

        const markers: IMarker[] = places.map(
            ({ id, name, coordinates, ...rest }) => ({
                id,
                name,
                coordinates,
                data: rest,
            })
        );

        useImperativeHandle(
            ref,
            (): IMapRefProps => ({
                focusCurrentLocation: mapRef.current?.focusCurrentLocation!,
                zoomToAllMarkers: mapRef.current?.zoomToAllMarkers!,
                rotateToNorth: mapRef.current?.rotateToNorth!,
            })
        );

        return (
            <>
                <MapCore
                    // @ts-ignore
                    ref={mapRef}
                    markers={markers}
                    selectedMarkerId={selectedPlaceId}
                    initialViewCoordinates={initialViewCoordinates}
                    initialViewZoom={initialViewZoom}
                    initialFitBounds={initialFitBounds}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY!}
                    className={className}
                    renderMarkerComponent={(props) => (
                        <PlaceMarker
                            {...props}
                            onClick={() =>
                                onPlaceClick?.(props.data.id as IPlace["id"])
                            }
                        />
                    )}
                    isReadonly={isReadonly}
                    isSatelliteViewEnabled={isMapSatelliteViewEnabled}
                    onClick={onClick}
                />

                {isMapControlShown && (
                    <ContextMenu
                        title="Možnosti"
                        items={[
                            {
                                label: "Zobrazit mou polohu",
                                onClick: mapRef.current?.focusCurrentLocation,
                            },
                            {
                                label: "Zobrazit všechna místa na mapě",
                                onClick: mapRef.current?.zoomToAllMarkers,
                            },
                            {
                                label: "Otočit mapu na sever",
                                onClick: mapRef.current?.rotateToNorth,
                            },
                            {
                                label: isMapSatelliteViewEnabled
                                    ? "Skrýt satelitní snímky"
                                    : "Zobrazit satelitní snímky",
                                onClick: () =>
                                    setMapSateliteViewEnabled(
                                        !isMapSatelliteViewEnabled
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
        );
    }
);

Map.displayName = "Map";
