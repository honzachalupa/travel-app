"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { AccountForm, AuthContext, UserActions } from "@honzachalupa/admin";
import { useContext } from "react";

export default function Profil() {
    const { user } = useContext(AuthContext);
    const { navigateTo } = useNavigation();

    return (
        <Layout>
            <AccountForm
                user={user!}
                updateUser={UserActions.update}
                onSuccess={navigateTo.home}
            />
        </Layout>
    );
}
