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

            <div style={{ paddingTop: 50 }}>{children}</div>
        </Layout_Primary>
    );
};
