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
            <link rel="manifest" href="/site.webmanifest" />

            <link rel="shortcut icon" href="/favicons/favicon.ico" />

            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicons/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicons/favicon-16x16.png"
            />

            <meta name="apple-mobile-web-app-capable" content="yes" />

            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />

            <html lang="en">
                <body className="w-full h-full overscroll-none">
                    <Providers>{children}</Providers>
                </body>
            </html>
        </>
    );
}
