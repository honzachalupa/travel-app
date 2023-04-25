"use client";

import { PlacesActions } from "@/actions/places";
import { Context } from "@/components/Context";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { Place } from "@/types/map";
import { Button, ButtonsGroup } from "@honzachalupa/design-system";
import { useContext, useEffect, useMemo, useState } from "react";

interface Props {
    params: {
        placeId: Place["id"];
    };
}

export default function PlaceEdit({ params: { placeId } }: Props) {
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
            <ButtonsGroup alignment="right">
                <Button
                    label="Uložit"
                    isDisabled={!isOwner}
                    onClick={() => {}}
                />
            </ButtonsGroup>
        </Layout>
    );
}
