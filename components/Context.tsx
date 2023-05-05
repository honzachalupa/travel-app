"use client";

import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";
import {
    GeolocationCoordinates,
    useGeoLocation,
} from "@honzachalupa/design-system";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Context {
    user: User | null | undefined;
    currentLocation: GeolocationCoordinates;
    isLoading: boolean;
}

const initialContext: Context = {
    user: undefined,
    currentLocation: {
        longitude: undefined,
        latitude: undefined,
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
                currentLocation.latitude === undefined ||
                currentLocation.longitude === undefined,
        }));
    }, [user, currentLocation]);

    return <Context.Provider value={context}>{children}</Context.Provider>;
};
