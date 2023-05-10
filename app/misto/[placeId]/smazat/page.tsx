"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { usePlaces } from "@/hooks/usePlaces";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { IPlace } from "@/types/map";
import { Button, ButtonsGroup } from "@honzachalupa/design-system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
    params: {
        placeId: IPlace["id"];
    };
}

export default function PlaceDelete({ params: { placeId } }: IProps) {
    const router = useRouter();
    const { navigateTo } = useNavigation();
    const { fetchPlace, deletePlace, isUserPlaceOwner } = usePlaces();

    const [place, setPlace] = useState<IPlace>();

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
            <p className="text-center mb-5">
                Opravdu chcete odstranit místo {place?.name}?
            </p>

            <ButtonsGroup alignment="center">
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
