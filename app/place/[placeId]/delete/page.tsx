"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { usePlaces } from "@/hooks/usePlaces";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { Place } from "@/types/map";
import { Button, ButtonsGroup } from "@honzachalupa/design-system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    params: {
        placeId: Place["id"];
    };
}

export default function PlaceDelete({ params: { placeId } }: Props) {
    const router = useRouter();
    const navigateTo = useNavigation();
    const { fetchPlace, deletePlace, isUserPlaceOwner } = usePlaces();

    const [place, setPlace] = useState<Place>();

    const handleDelete = () => {
        deletePlace(placeId).then(() => {
            navigateTo.home();
        });
    };

    useEffect(() => {
        if (placeId) {
            fetchPlace(placeId).then(setPlace);
        }
    }, [placeId]);

    return (
        <Layout>
            <p>Opravdu chcete odstranit místo {place?.name}?</p>

            <ButtonsGroup alignment="right">
                <Button
                    label="Ano"
                    className="bg-red-500 text-white"
                    isDisabled={place && !isUserPlaceOwner(place)}
                    onClick={handleDelete}
                />

                <Button
                    label="Ne"
                    isDisabled={place && !isUserPlaceOwner(place)}
                    onClick={router.back}
                />
            </ButtonsGroup>
        </Layout>
    );
}
