"use client";

import { PlacesActions } from "@/actions/places";
import { Map } from "@/components/Map";
import { PlaceDetail } from "@/components/PlaceDetail";
import { LayoutHome as Layout } from "@/layouts/Home";
import { Place } from "@/types/map";
import { useEffect, useState } from "react";

export default function Home() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<Place>();

    const onPlaceSelected = (placeId: Place["id"]) => {
        setSelectedPlace(places.find(({ id }) => id === placeId));
    };

    useEffect(() => {
        PlacesActions.get().then(setPlaces);
    }, []);

    return (
        <Layout>
            <Map
                places={places}
                selectedPlaceId={selectedPlace?.id}
                initialFitBounds
                className="w-full h-full absolute top-0 left-0"
                onPlaceClick={onPlaceSelected}
            />

            <PlaceDetail
                place={selectedPlace}
                onClose={() => setSelectedPlace(undefined)}
            />
        </Layout>
    );
}
