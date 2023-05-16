"use client";

import { ContextMenu } from "@/components/ContextMenu";
import { Map } from "@/components/Map";
import { PlaceDetailContent } from "@/components/PlaceDetailContent";
import { AppContext } from "@/contexts/App";
import { PlacesContext } from "@/contexts/Places";
import { useNavigation } from "@/hooks/useNavigation";
import { MoreIcon } from "@/icons";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { IPlace } from "@/types/map";
import { useContext, useEffect, useState } from "react";

interface IProps {
    params: {
        placeId: IPlace["id"];
    };
}

export default function PlaceDetail({ params: { placeId } }: IProps) {
    const { location, navigateTo } = useNavigation();
    const {
        fetchPlace,
        getNavigationUrl,
        setIsVisited,
        setIsNotVisited,
        isPlaceVisited,
        isUserPlaceOwner,
    } = useContext(PlacesContext);

    const { user } = useContext(AppContext);

    const [place, setPlace] = useState<IPlace>();

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
                        initialFocusMarkers
                        isReadonly
                        isMapControlShown={false}
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
                                onClick: () =>
                                    navigator.share({
                                        url: `${location?.origin}?placeId=${placeId}`,
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
                        className="fixed right-5 bottom-5"
                    >
                        <MoreIcon className="w-full h-full p-3 accent-foreground" />
                    </ContextMenu>
                </>
            )}
        </Layout>
    );
}
