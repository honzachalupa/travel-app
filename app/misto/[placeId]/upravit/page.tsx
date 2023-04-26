"use client";

import { PlaceForm } from "@/components/PlaceForm";
import { useNavigation } from "@/hooks/useNavigation";
import { usePlaces } from "@/hooks/usePlaces";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { Place } from "@/types/map";
import { LoadingIndicator } from "@honzachalupa/design-system";
import { useEffect, useState } from "react";

interface Props {
    params: {
        placeId: Place["id"];
    };
}

export default function EditPlace({ params: { placeId } }: Props) {
    const navigateTo = useNavigation();
    const { fetchPlace, updatePlace } = usePlaces();

    const [place, setPlace] = useState<Place>();

    useEffect(() => {
        if (placeId) {
            fetchPlace(placeId).then(setPlace);
        }
    }, [placeId]);

    const handleUpdate = (formData: Omit<Place, "id">) =>
        updatePlace(placeId, formData).then(() => {
            navigateTo.placeDetail(placeId);
        });

    return (
        <Layout>
            {place ? (
                <PlaceForm
                    mode="edit"
                    defaultValues={{
                        name: place.name,
                        description: place.description,
                        type: place.type as unknown as string,
                        longitude: place.coordinates.longitude,
                        latitude: place.coordinates.latitude,
                        street: place.address?.street,
                        houseNumber: place.address?.houseNumber,
                        city: place.address?.city,
                        country: place.address?.country,
                        phoneNumber: place.contact?.phoneNumber,
                        emailAddress: place.contact?.emailAddress,
                    }}
                    onSubmit={handleUpdate}
                />
            ) : (
                <LoadingIndicator isFullscreen />
            )}
        </Layout>
    );
}
