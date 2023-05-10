"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { AuthContext, AuthForm } from "@honzachalupa/admin";
import { useContext } from "react";

export default function Login({
    searchParams,
}: {
    searchParams: {
        mode: "sign-up" | "sign-in";
    };
}) {
    const { navigateTo } = useNavigation();
    const { signUp, signIn } = useContext(AuthContext);

    return (
        <Layout>
            <AuthForm
                mode={searchParams.mode}
                signIn={signIn}
                signUp={signUp}
                onSuccess={navigateTo.home}
            />
        </Layout>
    );
}
