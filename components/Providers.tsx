"use client";

import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "@honzachalupa/design-system/build/tailwind-globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import { ContextProvider } from "./Context";

interface Props {
    children: ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
    return (
        <>
            <ContextProvider>{children}</ContextProvider>

            <Analytics />
            <GoogleAnalytics />
        </>
    );
};
