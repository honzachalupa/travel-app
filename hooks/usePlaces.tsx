import { PlaceActions } from "@/actions/place";
import { PlacesActions } from "@/actions/places";
import { Context } from "@/components/Context";
import { Coordinates } from "@/components/Map/Map.types";
import { IPlace, TNavigationAppId } from "@/types/map";
import { resolveNavigationUrl } from "@/utils/map";
import { AuthContext } from "@honzachalupa/admin";
import { useLocalStorage } from "@honzachalupa/design-system";
import { useCallback, useContext, useState } from "react";
import { getAirDistance } from "./usePlaces.utils";

export const usePlaces = () => {
    const { refreshSession } = useContext(AuthContext);
    const { user, currentLocation } = useContext(Context);

    const [settings] = useLocalStorage<{
        navigationApp: TNavigationAppId;
    }>("settings", {
        navigationApp: "apple-maps",
    });

    const [places, setPlaces] = useState<IPlace[]>([]);

    const create = (payload: Omit<IPlace, "id">) =>
        PlaceActions.create(payload);

    const update = (
        placeId: IPlace["id"],
        payload: Omit<IPlace, "id" | "ownerId">
    ) => PlaceActions.update(placeId, payload);

    const delete_ = (placeId: IPlace["id"]) => PlaceActions.delete(placeId);

    const fetch = useCallback(
        () =>
            PlacesActions.get().then((data) => {
                const sorted = data.sort((a, b) => {
                    const distanceA = getAirDistance(
                        currentLocation as Coordinates,
                        a.coordinates
                    );
                    const distanceB = getAirDistance(
                        currentLocation as Coordinates,
                        b.coordinates
                    );

                    return distanceA - distanceB;
                });
                setPlaces(sorted);

                return sorted;
            }),
        [currentLocation]
    );

    const fetchById = (id: IPlace["id"]) =>
        PlaceActions.get({ id }).then((places) => places[0]);

    const setIsVisited = (placeId: IPlace["id"]) => {
        if (user) {
            PlaceActions.setIsVisited({
                placeId,
                userId: user.id,
            }).then(() => {
                refreshSession();
            });
        } else {
            throw new Error("User is not signed in.");
        }
    };

    const setIsNotVisited = (placeId: IPlace["id"]) => {
        if (user) {
            PlaceActions.setIsNotVisited({
                placeId,
                userId: user.id,
            }).then(() => {
                refreshSession();
            });
        } else {
            throw new Error("User is not signed in.");
        }
    };

    const getNavigationUrl = useCallback(
        (place: IPlace) =>
            place &&
            resolveNavigationUrl(
                settings.navigationApp,
                place.address,
                place.coordinates
            ),
        [settings.navigationApp]
    );

    /* const isPlaceVisited = (id: IPlace["id"]) =>
        user?.visitedPlaceIds.includes(id); */

    const isUserPlaceOwner = (place: IPlace) =>
        place?.ownerId === user?.id || user?.role === "ADMIN";

    return {
        places,
        fetchPlace: fetchById,
        fetchPlaces: fetch,
        createPlace: create,
        updatePlace: update,
        deletePlace: delete_,
        getNavigationUrl,
        // isPlaceVisited,
        isUserPlaceOwner,
        setIsVisited,
        setIsNotVisited,
    };
};
