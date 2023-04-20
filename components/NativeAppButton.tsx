import { useGeoLocation } from "@/hooks/useGeoLocation";
import { Place } from "@/types/map";
import { ButtonLink } from "@honzachalupa/design-system";

interface Props {
    coordinates: Place["coordinates"];
}

export const NativeAppButton: React.FC<Props> = ({
    coordinates: { latitude, longitude },
}) => {
    const currentLocation = useGeoLocation();

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
