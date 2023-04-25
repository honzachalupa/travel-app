"use client";

import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { NavigationAppId, NavigationAppLabels } from "@/types/map";
import {
    Button,
    ButtonsGroup,
    Select,
    useLocalStorage,
} from "@honzachalupa/design-system";
import { useState } from "react";

interface FormData {
    navigationApp: NavigationAppId;
}

export default function Settings() {
    const [localStorageData, setLocalStorageData] = useLocalStorage<FormData>(
        "settings",
        {
            navigationApp: "google-maps",
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
                label="Výchozí navigační aplikace"
                placeholder="Vyberte aplikaci"
                defaultValue={formData.navigationApp}
                options={[
                    {
                        value: "google-maps",
                        label: NavigationAppLabels["google-maps"],
                    },
                    {
                        value: "apple-maps",
                        label: NavigationAppLabels["apple-maps"],
                    },
                    {
                        value: "waze",
                        label: NavigationAppLabels["waze"],
                    },
                    {
                        value: "mapy-cz",
                        label: NavigationAppLabels["mapy-cz"],
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
