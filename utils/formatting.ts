import { IPlace } from "@/types/map";

export const formatAddress = ({ name, address }: IPlace) =>
    [
        [address?.street, address?.houseNumber].filter(Boolean).join(" "),
        address?.city,
        address?.country,
    ]
        .filter((value) => value !== name)
        .filter((value) => value !== "Česká Republika")
        .filter(Boolean)
        .join(", ");
