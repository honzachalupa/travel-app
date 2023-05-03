"use client";

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
import { usePlaces } from "@/hooks/usePlaces";
import { LayoutHome as Layout } from "@/layouts/Home";
import { Place } from "@/types/map";
import { LoadingIndicator } from "@honzachalupa/design-system";
import { useContext, useEffect, useRef, useState } from "react";

const Content: React.FC = () => {
    const navigateTo = useNavigation();
    const { places, fetchPlaces } = usePlaces();

    const { user } = useContext(Context);

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
        fetchPlaces();
    }, []);

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
};

export default function Home() {
    const { isLoading } = useContext(Context);

    return isLoading ? <LoadingIndicator isFullscreen /> : <Content />;
}
