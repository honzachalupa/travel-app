import { Place } from "@/types/map";
import { useRouter } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter();

    return {
        login: ({ mode }: { mode: "sign-up" | "sign-in" }) =>
            router.push(`/login?mode=${mode}`),
        home: () => router.push("/"),
        settings: () => router.push("/settings"),
        about: () => router.push("/about"),
        placeCreate: () => router.push("/place/create"),
        placeDetail: (id: Place["id"]) => router.push(`/place/${id}`),
        placeEdit: (id: Place["id"]) => router.push(`/place/${id}/edit`),
    };
};
