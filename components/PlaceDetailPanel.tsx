import { Place } from "@/types/map";
import { useEffect, useState } from "react";
import Sheet from "react-modal-sheet";
import { PlaceDetailContent } from "./PlaceDetailContent";

interface Props {
    place?: Place;
    onClose?: () => void;
}

export const PlaceDetailPanel: React.FC<Props> = ({ place, onClose }) => {
    const [isOpened, setIsOpened] = useState<boolean>(!!place);

    useEffect(() => {
        if (place) {
            setIsOpened(true);
        }
    }, [place]);

    useEffect(() => {
        if (!isOpened) {
            onClose?.();
        }
    }, [isOpened]);

    return (
        <Sheet
            initialSnap={1}
            snapPoints={[600, 400, 0]}
            className="md:w-[600px] md:ml-5"
            isOpen={isOpened}
            onClose={() => setIsOpened(false)}
        >
            <Sheet.Container
                style={{ backgroundColor: "" }}
                className="theme-page-background !rounded-2xl"
            >
                <Sheet.Header />

                <Sheet.Content className="p-5 pt-0 -mt-5">
                    {place && (
                        <PlaceDetailContent place={place} isAllDetailsShown />
                    )}
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    );
};
