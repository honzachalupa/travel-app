"use client";

import { PlaceForm } from "@/components/PlaceForm";
import { PlacesContext } from "@/contexts/Places";
import { useNavigation } from "@/hooks/useNavigation";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { IPlace } from "@/types/map";
import { LoadingIndicator } from "@honzachalupa/design-system";
import { useContext, useEffect, useState } from "react";

interface IProps {
    params: {
        placeId: IPlace["id"];
    };
}

export default function EditPlace({ params: { placeId } }: IProps) {
    const { navigateTo } = useNavigation();
    const { fetchPlace, updatePlace } = useContext(PlacesContext);

    const [place, setPlace] = useState<IPlace>();

    useEffect(() => {
        if (placeId) {
            fetchPlace(placeId).then(setPlace);
        }
    }, [placeId]);

    const handleUpdate = (formData: Omit<IPlace, "id">) =>
        updatePlace(placeId, formData).then(() => {
            navigateTo.placeDetail(placeId);
        });

    return (
        <Layout title="Upravit místo">
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
                        url: place.contact?.url,
                        instagramUrl: place.contact?.instagramUrl,
                    }}
                    onSubmit={handleUpdate}
                />
            ) : (
                <LoadingIndicator isFullscreen />
            )}
        </Layout>
    );
}
