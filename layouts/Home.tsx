"use client";

import { useServiceWorker } from "@/hooks/useServiceWorker";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const LayoutHome: React.FC<Props> = ({ children }) => {
    useServiceWorker();
    const { user } = useSupabaseAuth();

    console.log(user);

    return <>{children}</>;
};
