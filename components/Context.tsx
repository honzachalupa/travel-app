import { createContext, ReactNode, useState } from "react";

interface Context {}

const initialContext: Context = {};

export const Context = createContext<Context>(initialContext);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [context, setContext] = useState<Context>(initialContext);

    return <Context.Provider value={context}>{children}</Context.Provider>;
};
