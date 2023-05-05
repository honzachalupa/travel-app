import { Place } from "@/types/map";
import { useRouter } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter();

    return {
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
    };
};
