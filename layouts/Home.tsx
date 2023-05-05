"use client";

import {
    PwaInstallationPrompt,
    useDesignSystem,
    useServiceWorker,
} from "@honzachalupa/design-system";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const LayoutHome: React.FC<Props> = ({ children }) => {
    useServiceWorker();
    useDesignSystem({
        locale: "cs",
    });

    return (
        <>
            {children}

            <PwaInstallationPrompt />
        </>
    );
};
