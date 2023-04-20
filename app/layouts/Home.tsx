"use client";

import { useServiceWorker } from "@/hooks/useServiceWorker";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const LayoutHome: React.FC<Props> = ({ children }) => {
    useServiceWorker();

    return <div>{children}</div>;
};
