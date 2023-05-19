"use client";

import { SettingsContext } from "@/contexts/Settings";
import { useNavigation } from "@/hooks/useNavigation";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { ENavigationAppLabels, TNavigationAppId } from "@/types/map";
import {
    Button,
    ButtonsGroup,
    Select,
    Toggle,
} from "@honzachalupa/design-system";
import { useContext, useState } from "react";

interface FormData {
    navigationApp: TNavigationAppId;
    isMapSatelliteViewEnabled: boolean;
}

export default function Settings() {
    const { navigateTo } = useNavigation();

    const {
        navigationApp,
        isMapSatelliteViewEnabled,
        setNavigationApp,
        setMapSateliteViewEnabled,
    } = useContext(SettingsContext);

    const [formData, setFormData] = useState<FormData>({
        navigationApp,
        isMapSatelliteViewEnabled,
    });

    const setFormDataValue = <T,>(key: keyof FormData, value: T) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        setNavigationApp(formData.navigationApp);
        setMapSateliteViewEnabled(formData.isMapSatelliteViewEnabled);

        navigateTo.home();
    };

    return (
        <Layout title="Nastavení">
            <Select
                label="Výchozí navigační aplikace"
                placeholder="Vyberte aplikaci"
                defaultValue={formData.navigationApp}
                options={[
                    {
                        value: "google-maps",
                        label: ENavigationAppLabels["google-maps"],
                    },
                    {
                        value: "apple-maps",
                        label: ENavigationAppLabels["apple-maps"],
                    },
                    {
                        value: "waze",
                        label: ENavigationAppLabels["waze"],
                    },
                    {
                        value: "mapy-cz",
                        label: ENavigationAppLabels["mapy-cz"],
                    },
                ]}
                onChange={(value) => setFormDataValue("navigationApp", value)}
            />

            <Toggle
                label="Zobrazit na mapě satelitní snímky"
                defaultValue={formData.isMapSatelliteViewEnabled}
                onChange={(value) =>
                    setFormDataValue("isMapSatelliteViewEnabled", value)
                }
            />

            <ButtonsGroup alignment="right">
                <Button label="Uložit" onClick={handleSubmit} />
            </ButtonsGroup>
        </Layout>
    );
}
