import { useAuthorization } from "@/hooks/useAuthorization";
import { User } from "@/types/user";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Context {
    user?: User | null;
}

const initialContext: Context = {
    user: undefined,
};

export const Context = createContext<Context>(initialContext);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { user } = useAuthorization();

    const [context, setContext] = useState<Context>(initialContext);

    useEffect(() => {
        setContext((prevContext) => ({
            ...prevContext,
            user,
        }));
    }, [user]);

    return <Context.Provider value={context}>{children}</Context.Provider>;
};
