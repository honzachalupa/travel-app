import { PlacesContext } from "@/contexts/Places";
import { useNavigation } from "@/hooks/useNavigation";
import { MoreIcon } from "@/icons";
import { IPlace } from "@/types/map";
import {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import { AppContext } from "../contexts/App";
import { ContextMenu } from "./ContextMenu";
import { IModalSheetRefProps, ModalSheet } from "./ModalSheet";
import { PlaceDetailContent } from "./PlaceDetailContent";

interface IProps {
    place?: IPlace;
    onClose: () => void;
}

export interface IPlaceDetailPanelRefProps {
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpened: boolean | undefined;
}

export const PlaceDetailPanel = forwardRef(
    ({ place, onClose }: IProps, ref) => {
        const { location, navigateTo } = useNavigation();
        const {
            isPlaceVisited,
            getNavigationUrl,
            setIsVisited,
            setIsNotVisited,
        } = useContext(PlacesContext);

        const { user } = useContext(AppContext);

        const modalSheetRef = useRef<IModalSheetRefProps>();

        useEffect(() => {
            if (place) {
                modalSheetRef.current?.open();
            }
        }, [place]);

        useImperativeHandle(
            ref,
            (): IPlaceDetailPanelRefProps => ({
                open: () => modalSheetRef.current?.open(),
                close: () => modalSheetRef.current?.close(),
                toggle: () => modalSheetRef.current?.toggle(),
                isOpened: modalSheetRef.current?.isOpened,
            }),
            [modalSheetRef.current?.isOpened]
        );

        return (
            <>
                <ModalSheet
                    ref={modalSheetRef}
                    snapPoints={[600, 400, 0]}
                    className="md:w-[600px] md:ml-5"
                    onClose={onClose}
                >
                    {place && (
                        <PlaceDetailContent
                            place={place}
                            isContactInfoShown
                            isDisclaimerShown
                        />
                    )}
                </ModalSheet>

                {place && (
                    <ContextMenu
                        title="Možnosti"
                        items={[
                            user && isPlaceVisited(place.id)
                                ? {
                                      label: "Označit jako nenavštívené",
                                      onClick: () => setIsNotVisited(place.id),
                                  }
                                : user && !isPlaceVisited(place.id)
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
                                label: "Sdílet",
                                onClick: () =>
                                    navigator.share({
                                        url: `${location?.origin}?placeId=${place.id}`,
                                    }),
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
    }
);

PlaceDetailPanel.displayName = "PlaceDetailPanel";
