"use client";

import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "@honzachalupa/design-system/tailwind-globals.css";
import { ReactNode } from "react";
import { ContextProvider } from "./Context";

interface Props {
    children: ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
    return (
        <>
            <ContextProvider>{children}</ContextProvider>

            <GoogleAnalytics />
        </>
    );
};
