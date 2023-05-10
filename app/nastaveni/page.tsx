"use client";

import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { ENavigationAppLabels, TNavigationAppId } from "@/types/map";
import {
    Button,
    ButtonsGroup,
    Select,
    useLocalStorage,
} from "@honzachalupa/design-system";
import { useState } from "react";

interface FormData {
    navigationApp: TNavigationAppId;
}

export default function Settings() {
    const [localStorageData, setLocalStorageData] = useLocalStorage<FormData>(
        "settings",
        {
            navigationApp: "google-maps",
        }
    );

    const [formData, setFormData] = useState<FormData>(localStorageData);

    const setFormDataValue = <T,>(key: keyof FormData, value: T) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value as any,
        }));
    };

    const handleSubmit = () => {
        setLocalStorageData(formData);
    };

    return (
        <Layout>
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

            <ButtonsGroup alignment="right">
                <Button label="Uložit" onClick={handleSubmit} />
            </ButtonsGroup>
        </Layout>
    );
}
