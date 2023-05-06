"use client";

import { UserActions } from "@/actions/user";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { AccountForm } from "@honzachalupa/design-system";

export default function Profil() {
    const { user } = useAuth();
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
