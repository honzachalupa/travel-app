import { useNavigation } from "@/hooks/useNavigation";
import { usePlaces } from "@/hooks/usePlaces";
import { MoreIcon } from "@/icons";
import { Place } from "@/types/map";
import {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { Context } from "./Context";
import { ContextMenu } from "./ContextMenu";
import { ModalSheet, ModalSheetRefProps } from "./ModalSheet";
import { PlaceDetailContent } from "./PlaceDetailContent";

interface Props {
    place?: Place;
    onClose: () => void;
}

export interface PlaceDetailPanelRefProps {
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpened: boolean | undefined;
}

export const PlaceDetailPanel = forwardRef(({ place, onClose }: Props, ref) => {
    const navigateTo = useNavigation();
    const { getNavigationUrl, setIsVisited, setIsNotVisited } = usePlaces();

    const { user } = useContext(Context);

    const modalSheetRef = useRef<ModalSheetRefProps>();

    useEffect(() => {
        if (place) {
            modalSheetRef.current?.open();
        }
    }, [place]);

    useImperativeHandle(
        ref,
        (): PlaceDetailPanelRefProps => ({
            open: () => modalSheetRef.current?.open(),
            close: () => modalSheetRef.current?.close(),
            toggle: () => modalSheetRef.current?.toggle(),
            isOpened: modalSheetRef.current?.isOpened,
        }),
        [modalSheetRef.current?.isOpened]
    );

    // console.log(2, { isOpened: modalSheetRef.current?.isOpened });

    return (
        <>
            <ModalSheet
                ref={modalSheetRef}
                snapPoints={[600, 400, 0]}
                className="md:w-[600px] md:ml-5"
                onClose={onClose}
            >
                {place && <PlaceDetailContent place={place} />}
            </ModalSheet>

            {place && (
                <ContextMenu
                    title="Možnosti"
                    items={[
                        user && user.visitedPlaceIds.includes(place.id)
                            ? {
                                  label: "Označit jako nenavštívené",
                                  onClick: () => setIsNotVisited(place.id),
                              }
                            : user && !user.visitedPlaceIds.includes(place.id)
                            ? {
                                  label: "Označit jako navštívené",
                                  onClick: () => setIsVisited(place.id),
                              }
                            : null,
                        {
                            label: "Detail",
                            onClick: () => navigateTo.placeDetail(place.id),
                        },
                        {
                            label: "Navigovat",
                            href: getNavigationUrl(place),
                        },
                    ]}
                    itemsPosition={{
                        x: "left",
                        y: "top",
                    }}
                    zIndex={99999999}
                    className="absolute right-5 bottom-5"
                >
                    <MoreIcon className="w-full h-full p-3 accent-foreground" />
                </ContextMenu>
            )}
        </>
    );
});

PlaceDetailPanel.displayName = "PlaceDetailPanel";
