"use client";

import { PlacesActions } from "@/actions/places";
import { Context } from "@/components/Context";
import { ContextMenu } from "@/components/ContextMenu";
import { Map } from "@/components/Map";
import { PlaceDetailContent } from "@/components/PlaceDetailContent";
import { useNavigation } from "@/hooks/useNavigation";
import { MoreIcon } from "@/icons";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { Place } from "@/types/map";
import { useContext, useEffect, useMemo, useState } from "react";

interface Props {
    params: {
        placeId: Place["id"];
    };
}

export default function PlaceDetail({ params: { placeId } }: Props) {
    const navigateTo = useNavigation();

    const { user } = useContext(Context);

    const [place, setPlace] = useState<Place>();

    const isOwner = useMemo(
        () => place?.ownerId === user?.id || user?.role === "ADMIN",
        [place, user]
    );

    const fetchPlace = async (placeId: Place["id"]) => {
        const places = await PlacesActions.get({ id: placeId });

        setPlace(places[0]);
    };

    useEffect(() => {
        if (placeId) {
            fetchPlace(placeId);
        }
    }, [placeId]);

    return (
        <Layout>
            {place && (
                <>
                    <Map
                        places={[place]}
                        className="aspect-video mb-5"
                        initialFitBounds
                        isReadonly
                        isMapControlShown={false}
                    />

                    <PlaceDetailContent place={place} isAllDetailsShown />

                    <ContextMenu
                        title="Možnosti"
                        // @ts-ignore
                        items={[
                            {
                                label: "Upravit",
                                onClick: () => navigateTo.placeEdit(place.id),
                            },
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
                </>
            )}
        </Layout>
    );
}
