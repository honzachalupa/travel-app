"use client";

import { PlaceForm } from "@/components/PlaceForm";
import config from "@/config";
import { PlacesContext } from "@/contexts/Places";
import { useNavigation } from "@/hooks/useNavigation";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { IPlace } from "@/types/map";
import { useLogger } from "@honzachalupa/logger";
import { useContext } from "react";

export default function CreatePlace() {
    const { navigateTo } = useNavigation();
    const { log } = useLogger(config.appId);

    const { createPlace } = useContext(PlacesContext);

    const handleCreate = (formData: Omit<IPlace, "id">) =>
        createPlace(formData).then(({ id }) => {
            log.info("Place created.", { id, ...formData });

            navigateTo.home(id);
        });

    return (
        <Layout title="Vytvořit místo">
            <PlaceForm mode="create" onSubmit={handleCreate} />
        </Layout>
    );
}
