"use client";

import { PillNavigation } from "@/components/PillNavigation";
import {
    DesignSystemContext,
    Layout_Primary,
} from "@honzachalupa/design-system";
import { ReactNode, useContext, useEffect } from "react";

interface IProps {
    children: ReactNode;
}

export const LayoutPrimary: React.FC<IProps> = ({ children }) => {
    const { setLocale } = useContext(DesignSystemContext);

    useEffect(() => {
        setLocale("cs");
    }, []);

    return (
        <Layout_Primary>
            <PillNavigation />

            <div className="pt-[70px] md:pt-[90px] md:mx-auto md:max-w-[800px]">
                {children}
            </div>
        </Layout_Primary>
    );
};
