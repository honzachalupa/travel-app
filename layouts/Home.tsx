"use client";

import {
    DesignSystemContext,
    PwaInstallationPrompt,
    useServiceWorker,
} from "@honzachalupa/design-system";
import { ReactNode, useContext, useEffect } from "react";

interface IProps {
    children: ReactNode;
}

export const LayoutHome: React.FC<IProps> = ({ children }) => {
    useServiceWorker();
    const { setLocale } = useContext(DesignSystemContext);

    useEffect(() => {
        setLocale("cs");
    }, []);

    return (
        <>
            {children}

            <PwaInstallationPrompt />
        </>
    );
};
