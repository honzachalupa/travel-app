import { IPlace } from "@/types/map";
import { useLocation } from "@honzachalupa/design-system";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
    const searchParams_ = useSearchParams();
    const router = useRouter();
    const location = useLocation();

    const searchParams = useMemo(
        () => Object.fromEntries(searchParams_.entries()),
        [searchParams_]
    );

    const navigateTo = {
        back: router.back,
        forward: router.forward,
        refresh: router.refresh,
        replace: router.replace,

        login: ({ mode }: { mode: "sign-up" | "sign-in" }) =>
            router.push(`/login?mode=${mode}`),
        home: () => router.push("/"),
        profile: () => router.push("/ucet"),
        settings: () => router.push("/nastaveni"),
        about: () => router.push("/o-aplikaci"),
        placeCreate: () => router.push("/misto/vytvorit"),
        placeDetail: (id: IPlace["id"]) => router.push(`/misto/${id}`),
        placeEdit: (id: IPlace["id"]) => router.push(`/misto/${id}/upravit`),
        placeDelete: (id: IPlace["id"]) => router.push(`/misto/${id}/smazat`),
    };

    return {
        location,
        searchParams,
        navigateTo,
    };
};
