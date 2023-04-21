"use client";

import config from "@/config";
import { Layout_Primary, Navigation } from "@honzachalupa/design-system";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const LayoutPrimary: React.FC<Props> = ({ children }) => {
    return (
        <Layout_Primary>
            <Navigation
                brand={{
                    name: config.appName,
                }}
                primaryItems={[
                    {
                        label: "Místa",
                        href: "/",
                    },
                    {
                        label: "Vytvořit místo",
                        href: "/create-place",
                    },
                ]}
                hasPadding={false}
            />

            {children}
        </Layout_Primary>
    );
};
