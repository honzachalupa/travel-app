"use client";

import { PlaceForm } from "@/components/PlaceForm";
import config from "@/config";
import { PlacesContext } from "@/contexts/Places";
import { useNavigation } from "@/hooks/useNavigation";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { IPlace } from "@/types/map";
import { LoadingIndicator } from "@honzachalupa/design-system";
import { useLogger } from "@honzachalupa/logger";
import { useContext, useEffect, useState } from "react";

interface IProps {
    params: {
        placeId: IPlace["id"];
    };
}

export default function EditPlace({ params: { placeId } }: IProps) {
    const { log } = useLogger(config.appId);
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
            log.info("Place updated.", { id: placeId, ...formData });

            navigateTo.home(placeId);
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
                        isFeatured: place.isFeatured || false,
                    }}
                    onSubmit={handleUpdate}
                />
            ) : (
                <LoadingIndicator isFullscreen />
            )}
        </Layout>
    );
}
