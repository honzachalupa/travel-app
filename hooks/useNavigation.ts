import { Place } from "@/types/map";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
    const searchParams_ = useSearchParams();
    const router = useRouter();

    const location = useMemo(() => window.location, [window.location]);

    const searchParams = useMemo(
        () => Object.fromEntries(searchParams_.entries()),
        [searchParams_]
    );

    const navigateTo = {
        login: ({ mode }: { mode: "sign-up" | "sign-in" }) =>
            router.push(`/login?mode=${mode}`),
        home: () => router.push("/"),
        profile: () => router.push("/ucet"),
        settings: () => router.push("/nastaveni"),
        about: () => router.push("/o-aplikaci"),
        placeCreate: () => router.push("/misto/vytvorit"),
        placeDetail: (id: Place["id"]) => router.push(`/misto/${id}`),
        placeEdit: (id: Place["id"]) => router.push(`/misto/${id}/upravit`),
        placeDelete: (id: Place["id"]) => router.push(`/misto/${id}/smazat`),

        back: () => router.back(),
        forward: () => router.forward(),
        refresh: () => router.refresh(),
        replace: (url: string) => router.replace(url),
    };

    return {
        location,
        searchParams,
        navigateTo,
    };
};
