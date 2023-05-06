import { PlaceActions } from "@/actions/place";
import { PlacesActions } from "@/actions/places";
import { Context } from "@/components/Context";
import { Coordinates } from "@/components/Map/Map.types";
import { NavigationAppId, Place } from "@/types/map";
import { resolveNavigationUrl } from "@/utils/map";
import { useLocalStorage } from "@honzachalupa/design-system";
import { useCallback, useContext, useState } from "react";
import { useAuth } from "./useAuth";
import { getAirDistance } from "./usePlaces.utils";

export const usePlaces = () => {
    const { refreshSession } = useAuth();
    const { user, currentLocation } = useContext(Context);

    const [settings] = useLocalStorage<{
        navigationApp: NavigationAppId;
    }>("settings", {
        navigationApp: "apple-maps",
    });

    const [places, setPlaces] = useState<Place[]>([]);

    const create = (payload: Omit<Place, "id">) => PlaceActions.create(payload);

    const update = (
        placeId: Place["id"],
        payload: Omit<Place, "id" | "ownerId">
    ) => PlaceActions.update(placeId, payload);

    const delete_ = (placeId: Place["id"]) => PlaceActions.delete(placeId);

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

    const fetchById = (id: Place["id"]) =>
        PlaceActions.get({ id }).then((places) => places[0]);

    const setIsVisited = (placeId: Place["id"]) => {
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

    const setIsNotVisited = (placeId: Place["id"]) => {
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
        (place: Place) =>
            place &&
            resolveNavigationUrl(
                settings.navigationApp,
                place.address,
                place.coordinates
            ),
        [settings.navigationApp]
    );

    /* const isPlaceVisited = (id: Place["id"]) =>
        user?.visitedPlaceIds.includes(id); */

    const isUserPlaceOwner = (place: Place) =>
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
