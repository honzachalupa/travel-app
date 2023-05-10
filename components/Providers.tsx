"use client";

import { AuthContextProvider } from "@honzachalupa/admin";
import { DesignSystemContextProvider } from "@honzachalupa/design-system";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import { ContextProvider } from "./Context";

interface IProps {
    children: ReactNode;
}

export const Providers: React.FC<IProps> = ({ children }) => {
    return (
        <>
            <DesignSystemContextProvider>
                <AuthContextProvider>
                    <ContextProvider>{children}</ContextProvider>
                </AuthContextProvider>
            </DesignSystemContextProvider>

            <Analytics />
        </>
    );
};
