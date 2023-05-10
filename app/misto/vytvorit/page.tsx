"use client";

import { PlaceForm } from "@/components/PlaceForm";
import { useNavigation } from "@/hooks/useNavigation";
import { usePlaces } from "@/hooks/usePlaces";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { IPlace } from "@/types/map";

export default function CreatePlace() {
    const { navigateTo } = useNavigation();
    const { createPlace } = usePlaces();

    const handleCreate = (formData: Omit<IPlace, "id">) =>
        createPlace(formData).then(() => {
            navigateTo.home();
        });

    return (
        <Layout>
            <PlaceForm mode="create" onSubmit={handleCreate} />
        </Layout>
    );
}
