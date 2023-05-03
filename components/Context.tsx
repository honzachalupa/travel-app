"use client";

import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";
import { useGeoLocation } from "@honzachalupa/design-system";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Coordinates } from "./Map/Map.types";

interface Context {
    user: User | null | undefined;
    currentLocation: Coordinates;
    isLoading: boolean;
}

const initialContext: Context = {
    user: undefined,
    currentLocation: {
        longitude: 0,
        latitude: 0,
    },
    isLoading: true,
};

export const Context = createContext<Context>(initialContext);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { user } = useAuth();
    const currentLocation = useGeoLocation();

    const [context, setContext] = useState<Context>(initialContext);

    useEffect(() => {
        setContext((prevContext) => ({
            ...prevContext,
            user,
        }));
    }, [user]);

    useEffect(() => {
        setContext((prevContext) => ({
            ...prevContext,
            currentLocation,
        }));
    }, [currentLocation]);

    useEffect(() => {
        setContext((prevContext) => ({
            ...prevContext,
            isLoading:
                user === undefined ||
                currentLocation.latitude === 0 ||
                currentLocation.longitude === 0,
        }));
    }, [user, currentLocation]);

    return <Context.Provider value={context}>{children}</Context.Provider>;
};
