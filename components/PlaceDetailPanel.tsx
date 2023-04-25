import { PlaceActions } from "@/actions/place";
import { useAuthorization } from "@/hooks/useAuthorization";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useNavigation } from "@/hooks/useNavigation";
import { MoreIcon } from "@/icons";
import { NavigationAppId, Place } from "@/types/map";
import { User } from "@/types/user";
import { resolveNavigationUrl } from "@/utils/map";
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
    const { refreshSession } = useAuthorization();

    const { user } = useContext(Context);

    const [settings, _] = useLocalStorage<{
        navigationApp: NavigationAppId;
    }>("settings", {
        navigationApp: "apple-maps",
    });

    const modalSheetRef = useRef<ModalSheetRefProps>();

    const navigationAppUrl =
        place &&
        resolveNavigationUrl(
            settings.navigationApp,
            place.address,
            place.coordinates
        );

    const handleMarkAsVisited = (placeId: Place["id"], userId: User["id"]) => {
        PlaceActions.setIsVisited({
            placeId,
            userId,
        }).then(() => {
            refreshSession();
        });
    };

    const handleUnmarkAsVisited = (
        placeId: Place["id"],
        userId: User["id"]
    ) => {
        PlaceActions.setIsNotVisited({
            placeId,
            userId,
        }).then(() => {
            refreshSession();
        });
    };

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
                {place && (
                    <PlaceDetailContent place={place} isAllDetailsShown />
                )}
            </ModalSheet>

            {place && (
                <ContextMenu
                    title="Možnosti"
                    // @ts-ignore
                    items={[
                        user && user.visitedPlaceIds.includes(place.id)
                            ? {
                                  label: "Označit jako nenavštívené",
                                  onClick: () =>
                                      handleUnmarkAsVisited(place.id, user.id),
                              }
                            : user && !user.visitedPlaceIds.includes(place.id)
                            ? {
                                  label: "Označit jako navštívené",
                                  onClick: () =>
                                      handleMarkAsVisited(place.id, user.id),
                              }
                            : null,
                        {
                            label: "Detail",
                            onClick: () => navigateTo.placeDetail(place.id),
                        },
                        place.ownerId === user?.id
                            ? {
                                  label: "Upravit",
                                  onClick: () => navigateTo.placeEdit(place.id),
                              }
                            : null,
                        navigationAppUrl
                            ? {
                                  label: "Navigovat",
                                  href: navigationAppUrl,
                              }
                            : null,
                    ].filter(Boolean)}
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
