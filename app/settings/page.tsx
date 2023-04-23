"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { Button, ButtonsGroup, Select } from "@honzachalupa/design-system";
import { useState } from "react";

interface FormData {
    navigationApp: "apple-maps" | "google-maps" | "waze" | "mapy-cz";
}

export default function Settings() {
    const [localStorageData, setLocalStorageData] = useLocalStorage<FormData>(
        "settings",
        {
            navigationApp: "apple-maps",
        }
    );

    const [formData, setFormData] = useState<FormData>(localStorageData);

    const setFormDataValue = <T,>(key: keyof typeof formData, value: T) => {
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
                label="Výchozí navigace"
                placeholder="Vyberte aplikaci"
                defaultValue={formData.navigationApp}
                options={[
                    {
                        value: "apple-maps",
                        label: "Apple Maps",
                    },
                    {
                        value: "google-maps",
                        label: "Google Maps",
                    },
                    {
                        value: "waze",
                        label: "Waze",
                    },
                    {
                        value: "mapy-cz",
                        label: "Mapy.cz",
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
