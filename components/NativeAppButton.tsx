import { Context } from "@/components/Context";
import { Place } from "@/types/map";
import { ButtonLink } from "@honzachalupa/design-system";
import { useContext } from "react";

interface Props {
    coordinates: Place["coordinates"];
}

export const NativeAppButton: React.FC<Props> = ({
    coordinates: { latitude, longitude },
}) => {
    const { currentLocation } = useContext(Context);

    const app = {
        apple: {
            name: "Apple Maps",
            url: `http://maps.apple.com/?sll=${latitude},${longitude}`,
        },
    }.apple;

    return currentLocation ? (
        <ButtonLink
            label={`Open in ${app.name}`}
            href={app.url}
            target="_blank"
        />
    ) : null;
};
