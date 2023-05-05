"use client";

import { PillNavigation } from "@/components/PillNavigation";
import { Layout_Primary } from "@honzachalupa/design-system";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const LayoutPrimary: React.FC<Props> = ({ children }) => {
    return (
        <Layout_Primary>
            <PillNavigation />

            <div className="pt-[70px] md:pt-[90px] md:mx-auto md:max-w-[800px]">
                {children}
            </div>
        </Layout_Primary>
    );
};
