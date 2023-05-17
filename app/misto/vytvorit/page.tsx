"use client";

import { PlaceForm } from "@/components/PlaceForm";
import { PlacesContext } from "@/contexts/Places";
import { useNavigation } from "@/hooks/useNavigation";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { IPlace } from "@/types/map";
import { useContext } from "react";

export default function CreatePlace() {
    const { navigateTo } = useNavigation();
    const { createPlace } = useContext(PlacesContext);

    const handleCreate = (formData: Omit<IPlace, "id">) =>
        createPlace(formData).then(({ id: placeId }) => {
            navigateTo.home(placeId);
        });

    return (
        <Layout>
            <PlaceForm mode="create" onSubmit={handleCreate} />
        </Layout>
    );
}
