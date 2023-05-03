"use client";

import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { AuthForm } from "@honzachalupa/design-system";

export default function Login({
    searchParams,
}: {
    searchParams: {
        mode: "sign-up" | "sign-in";
    };
}) {
    const navigateTo = useNavigation();
    const { signUp, signIn } = useAuth();

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
