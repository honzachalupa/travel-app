import { LayoutPrimary as Layout } from "@/layouts/Primary";

export default function About() {
    return (
        <Layout title="O aplikaci">
            <div className="h-full flex flex-col justify-center items-center">
                <p>Created with ❤️ from Croatia</p>

                <a
                    href="https://janchalupa.dev/"
                    target="_blank"
                    className="mt-1"
                >
                    https://janchalupa.dev/
                </a>
            </div>
        </Layout>
    );
}
