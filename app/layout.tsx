import { Providers } from "@/components/Providers";
import config from "@/config";
import "./layout.css";

export const metadata = {
    title: config.appName,
    description: config.description,
    keywords: config.keywords,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <link rel="manifest" href="/manifest.json" />

            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />
            <meta
                name="viewport"
                content="viewport-fit=cover, width=device-width, initial-scale=1.0"
            />

            <html lang="en">
                <body className="w-full h-full overscroll-none">
                    <Providers>{children}</Providers>
                </body>
            </html>
        </>
    );
}
