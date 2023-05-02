"use client";

import { UserActions } from "@/actions/user";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { Button, ButtonsGroup, Input } from "@honzachalupa/design-system";
import { useEffect, useState } from "react";

interface FormData {
    firstName: string | undefined;
    lastName: string | undefined;
}

export default function Profil() {
    const { user } = useAuth();
    const navigateTo = useNavigation();

    const [formData, setFormData] = useState<FormData>({
        firstName: undefined,
        lastName: undefined,
    });

    const setFormDataValue = <T,>(key: keyof typeof formData, value: T) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value as any,
        }));
    };

    const handleSubmit = () => {
        if (user && formData.firstName && formData.lastName) {
            UserActions.update(user.id, {
                firstName: formData.firstName,
                lastName: formData.lastName,
            }).then(() => {
                navigateTo.home();
            });
        }
    };

    useEffect(() => {
        setFormData({
            firstName: user?.firstName,
            lastName: user?.lastName,
        });
    }, [user]);

    return (
        <Layout>
            <Input
                label="Jméno"
                value={formData.firstName}
                onChange={(value) => {
                    setFormDataValue("firstName", value);
                }}
            />

            <Input
                label="Příjmení"
                value={formData.lastName}
                onChange={(value) => {
                    setFormDataValue("lastName", value);
                }}
            />

            <Input
                label="E-mailová adresa"
                value={user?.emailAddress}
                isDisabled
            />

            <ButtonsGroup alignment="right">
                <Button
                    label="Uložit"
                    isDisabled={!formData.firstName || !formData.lastName}
                    onClick={handleSubmit}
                />
            </ButtonsGroup>
        </Layout>
    );
}
