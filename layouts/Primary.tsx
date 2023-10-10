"use client";

import { Navigation } from "@/components/Navigation";
import { DesignSystemContext, Layout } from "@honzachalupa/design-system";
import { ReactNode, useContext, useEffect } from "react";

interface IProps {
    title?: string;
    children: ReactNode;
}

export const LayoutPrimary: React.FC<IProps> = ({ title, children }) => {
    const { setLocale } = useContext(DesignSystemContext);

    useEffect(() => {
        setLocale("cs");
    }, []);

    return (
        <Layout.Blank>
            {title && (
                <header className="w-full flex justify-center absolute top-0 left-0 my-5">
                    <h1 className="text-lg">{title}</h1>
                </header>
            )}

            <Navigation isTransparent />

            <div className="h-full pt-[70px] md:pt-[90px] md:mx-auto md:max-w-[800px]">
                {children}
            </div>
        </Layout.Blank>
    );
};
