"use client";

import { PlacesActions } from "@/actions/places";
import { Context } from "@/components/Context";
import { Map } from "@/components/Map";
import { PillNavigation } from "@/components/PillNavigation";
import {
    PlaceDetailPanel,
    PlaceDetailPanelRefProps,
} from "@/components/PlaceDetailPanel";
import {
    PlacesListPanel,
    PlacesListPanelRefProps,
} from "@/components/PlacesListPanel";
import { useNavigation } from "@/hooks/useNavigation";
import { LayoutHome as Layout } from "@/layouts/Home";
import { Place } from "@/types/map";

import { useContext, useEffect, useRef, useState } from "react";

export default function Home() {
    const navigateTo = useNavigation();

    const { user } = useContext(Context);

    const [places, setPlaces] = useState<Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<Place>();

    const placeDetailRef = useRef<PlaceDetailPanelRefProps>(null);
    const placesListRef = useRef<PlacesListPanelRefProps>(null);

    const onPlaceSelected = (placeId: Place["id"]) => {
        setSelectedPlace(places.find(({ id }) => id === placeId));
    };

    const handlePlacesListClick = () => {
        placesListRef.current?.toggle();
    };

    useEffect(() => {
        PlacesActions.get({}).then(setPlaces);
    }, []);

    // console.log(3, { isOpened: placeDetailRef.current?.isOpened });

    return (
        <Layout>
            <PillNavigation
                onPlacesListClick={handlePlacesListClick}
                onCreatePlaceClick={
                    user ? () => navigateTo.placeCreate() : undefined
                }
            />

            <Map
                places={places}
                selectedPlaceId={selectedPlace?.id}
                initialFitBounds
                className="w-screen h-screen !absolute top-0 left-0 rounded-t-2xl md:rounded-none"
                isPlaceVisited={(placeId) =>
                    user?.visitedPlaceIds.includes(placeId) || false
                }
                isSetCurrentLocationButtonShown={
                    !placeDetailRef.current?.isOpened
                }
                onPlaceClick={onPlaceSelected}
            />

            <PlaceDetailPanel
                ref={placeDetailRef}
                place={selectedPlace}
                onClose={() => setSelectedPlace(undefined)}
            />

            <PlacesListPanel
                ref={placesListRef}
                places={places}
                onOpen={() => {
                    placeDetailRef.current?.close();
                }}
                onPlaceSelected={(placeId) => {
                    onPlaceSelected(placeId);

                    placesListRef.current?.close();
                }}
            />
        </Layout>
    );
}
