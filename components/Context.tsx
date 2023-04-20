import { useGeoLocation } from "@/hooks/useGeoLocation";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Coordinates } from "./Map/Map.types";

interface Context {
    currentLocation: Coordinates | null;
}

const initialContext: Context = {
    currentLocation: null,
};

export const Context = createContext<Context>(initialContext);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { longitude, latitude } = useGeoLocation();

    const [context, setContext] = useState<Context>(initialContext);

    useEffect(() => {
        setContext({
            currentLocation: {
                longitude,
                latitude,
            },
        });
    }, [longitude, latitude]);

    return <Context.Provider value={context}>{children}</Context.Provider>;
};
