import { Place } from "@/types/map";

export const formatAddress = (address: Place["address"]) =>
    [
        [address?.street, address?.houseNumber].filter(Boolean).join(" "),
        address?.city,
        address?.country,
    ]
        .filter(Boolean)
        .join(", ");
