"use client";

import { TNavigationAppId } from "@/types/map";
import { createContext, ReactNode, useEffect, useState } from "react";

interface ISettingsContext {
    navigationApp: TNavigationAppId;
    isMapSatelliteViewEnabled: boolean;
    setNavigationApp: (value: TNavigationAppId) => void;
    setMapSateliteViewEnabled: (value: boolean) => void;
}

const localStorageData = JSON.parse(localStorage.getItem("settings") || "{}");

const initialContext: ISettingsContext = {
    navigationApp: localStorageData.navigationApp || "google-maps",
    isMapSatelliteViewEnabled:
        localStorageData.isMapSatelliteViewEnabled || false,
    setNavigationApp: () => {},
    setMapSateliteViewEnabled: () => {},
};

export const SettingsContext = createContext<ISettingsContext>(initialContext);

export const SettingsContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [context, setContext] = useState<ISettingsContext>(initialContext);

    const setNavigationApp = (value: TNavigationAppId) => {
        setContext((prevState) => ({
            ...prevState,
            navigationApp: value,
        }));
    };

    const setMapSateliteViewEnabled = (value: boolean) => {
        setContext((prevState) => ({
            ...prevState,
            isMapSatelliteViewEnabled: value,
        }));
    };

    useEffect(() => {
        localStorage.setItem(
            "settings",
            JSON.stringify({
                navigationApp: context.navigationApp,
                isMapSatelliteViewEnabled: context.isMapSatelliteViewEnabled,
            })
        );
    }, [context]);

    const value: ISettingsContext = {
        ...context,
        setNavigationApp,
        setMapSateliteViewEnabled,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
