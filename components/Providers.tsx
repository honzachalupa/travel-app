"use client";

import { PlacesContextProvider } from "@/contexts/Places";
import { SettingsContextProvider } from "@/contexts/Settings";
import { AuthContextProvider } from "@honzachalupa/admin";
import { DesignSystemContextProvider } from "@honzachalupa/design-system";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import { AppContextProvider } from "../contexts/App";

interface IProps {
    children: ReactNode;
}

export const Providers: React.FC<IProps> = ({ children }) => {
    return (
        <>
            <DesignSystemContextProvider>
                <AuthContextProvider>
                    <AppContextProvider>
                        <PlacesContextProvider>
                            <SettingsContextProvider>
                                {children}
                            </SettingsContextProvider>
                        </PlacesContextProvider>
                    </AppContextProvider>
                </AuthContextProvider>
            </DesignSystemContextProvider>

            <Analytics />
        </>
    );
};
