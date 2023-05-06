"use client";

import { Context } from "@/components/Context";
import { ContextMenu } from "@/components/ContextMenu";
import { Map } from "@/components/Map";
import { PlaceDetailContent } from "@/components/PlaceDetailContent";
import { useNavigation } from "@/hooks/useNavigation";
import { usePlaces } from "@/hooks/usePlaces";
import { MoreIcon } from "@/icons";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { Place } from "@/types/map";
import { useContext, useEffect, useState } from "react";

interface Props {
    params: {
        placeId: Place["id"];
    };
}

export default function PlaceDetail({ params: { placeId } }: Props) {
    const navigateTo = useNavigation();
    const {
        fetchPlace,
        getNavigationUrl,
        setIsVisited,
        setIsNotVisited,
        isUserPlaceOwner,
    } = usePlaces();

    const { user } = useContext(Context);

    const [place, setPlace] = useState<Place>();

    useEffect(() => {
        if (placeId) {
            fetchPlace(placeId).then(setPlace);
        }
    }, [placeId]);

    return (
        <Layout>
            {place && (
                <>
                    <Map
                        places={[place]}
                        className="w-screen h-[calc(25vh+70px)] !absolute top-0 left-0"
                        initialFitBounds
                        isReadonly
                        isMapControlShown={false}
                        isPlaceVisited={(placeId) =>
                            user?.visitedPlaceIds.includes(placeId) || false
                        }
                    />

                    <PlaceDetailContent
                        place={place}
                        className="mt-[25vh]"
                        isContactInfoShown
                        isDisclaimerShown
                    />

                    <ContextMenu
                        title="Možnosti"
                        items={[
                            user && user.visitedPlaceIds.includes(place.id)
                                ? {
                                      label: "Označit jako nenavštívené",
                                      onClick: () => setIsNotVisited(place.id),
                                  }
                                : user &&
                                  !user.visitedPlaceIds.includes(place.id)
                                ? {
                                      label: "Označit jako navštívené",
                                      onClick: () => setIsVisited(place.id),
                                  }
                                : null,
                            isUserPlaceOwner(place)
                                ? {
                                      label: "Upravit",
                                      onClick: () =>
                                          navigateTo.placeEdit(place.id),
                                  }
                                : null,
                            isUserPlaceOwner(place)
                                ? {
                                      label: "Smazat",
                                      onClick: () =>
                                          navigateTo.placeDelete(place.id),
                                  }
                                : null,
                            {
                                label: "Sdílet",
                                onClick: () => navigator.share({ text: "xxx" }),
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
                        className="fixed right-5 bottom-5"
                    >
                        <MoreIcon className="w-full h-full p-3 accent-foreground" />
                    </ContextMenu>
                </>
            )}
        </Layout>
    );
}
