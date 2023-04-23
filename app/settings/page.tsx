"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { NavigationAppId } from "@/types/map";
import { Button, ButtonsGroup } from "@honzachalupa/design-system";
import { useState } from "react";

interface FormData {
    navigationApp: NavigationAppId;
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
            xxx
            <ButtonsGroup alignment="right">
                <Button label="Uložit" onClick={handleSubmit} />
            </ButtonsGroup>
        </Layout>
    );
}
