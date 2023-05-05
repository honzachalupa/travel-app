"use client";

import {
    PwaInstallationPrompt,
    useServiceWorker,
} from "@honzachalupa/design-system";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const LayoutHome: React.FC<Props> = ({ children }) => {
    useServiceWorker();

    return (
        <>
            {children}

            <PwaInstallationPrompt />
        </>
    );
};
