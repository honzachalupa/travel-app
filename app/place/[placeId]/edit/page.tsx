"use client";

import { usePlaces } from "@/hooks/usePlaces";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { Place } from "@/types/map";
import { Button, ButtonsGroup } from "@honzachalupa/design-system";
import { useEffect, useState } from "react";

interface Props {
    params: {
        placeId: Place["id"];
    };
}

export default function PlaceEdit({ params: { placeId } }: Props) {
    const { fetchPlace, isUserPlaceOwner } = usePlaces();

    const [place, setPlace] = useState<Place>();

    useEffect(() => {
        if (placeId) {
            fetchPlace(placeId).then(setPlace);
        }
    }, [placeId]);

    return (
        <Layout>
            <ButtonsGroup alignment="right">
                <Button
                    label="Uložit"
                    isDisabled={place && !isUserPlaceOwner(place)}
                    onClick={() => {}}
                />
            </ButtonsGroup>
        </Layout>
    );
}
