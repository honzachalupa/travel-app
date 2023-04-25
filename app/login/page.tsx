"use client";

import { useAuthorization } from "@/hooks/useAuthorization";
import { useNavigation } from "@/hooks/useNavigation";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { Button, Input, SwitchButton } from "@honzachalupa/design-system";
import { useState } from "react";

export default function Login({ searchParams }: any) {
    const navigateTo = useNavigation();
    const { signUp, signIn } = useAuthorization();

    const [mode, setMode] = useState<"sign-in" | "sign-up">(searchParams.mode);
    const [formData, setFormData] = useState<{
        firstName: string | undefined;
        lastName: string | undefined;
        emailAddress: string | undefined;
        password: string | undefined;
    }>({} as any);

    const setFormDataValue = <T,>(key: keyof typeof formData, value: T) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleSignUp = async () => {
        if (
            formData.firstName &&
            formData.lastName &&
            formData.emailAddress &&
            formData.password
        ) {
            await signUp({
                firstName: formData.firstName!,
                lastName: formData.lastName!,
                emailAddress: formData.emailAddress!,
                password: formData.password!,
            }).then(() => {
                navigateTo.home();
            });
        }
    };

    const handleSignIn = async () => {
        if (formData.emailAddress && formData.password) {
            await signIn({
                emailAddress: formData.emailAddress!,
                password: formData.password!,
            }).then(() => {
                navigateTo.home();
            });
        }
    };

    return (
        <Layout>
            <SwitchButton
                value={searchParams.mode}
                options={[
                    {
                        value: "sign-in",
                        label: "Přihlášení",
                    },
                    {
                        value: "sign-up",
                        label: "Registrace",
                    },
                ]}
                className="mb-5"
                onChange={setMode}
            />

            {mode === "sign-in" ? (
                <>
                    <Input
                        label="E-mailová adresa"
                        onChange={(value) =>
                            setFormDataValue("emailAddress", value)
                        }
                    />

                    <Input
                        label="Heslo"
                        type="password"
                        onChange={(value) =>
                            setFormDataValue("password", value)
                        }
                    />

                    <Button
                        label="Přihlásit se"
                        isDisabled={
                            !formData.emailAddress || !formData.password
                        }
                        onClick={handleSignIn}
                    />
                </>
            ) : (
                <>
                    <Input
                        label="Jméno"
                        onChange={(value) =>
                            setFormDataValue("firstName", value)
                        }
                    />

                    <Input
                        label="Příjmení"
                        onChange={(value) =>
                            setFormDataValue("lastName", value)
                        }
                    />

                    <Input
                        label="E-mailová adresa"
                        onChange={(value) =>
                            setFormDataValue("emailAddress", value)
                        }
                    />

                    <Input
                        label="Heslo"
                        type="password"
                        onChange={(value) =>
                            setFormDataValue("password", value)
                        }
                    />

                    <Input
                        label="Heslo (ověření)"
                        type="password"
                        onChange={(value) =>
                            setFormDataValue("password", value)
                        }
                    />

                    <Button
                        label="Registrovat se"
                        isDisabled={
                            !formData.firstName ||
                            !formData.lastName ||
                            !formData.emailAddress ||
                            !formData.password
                        }
                        onClick={handleSignUp}
                    />
                </>
            )}
        </Layout>
    );
}
