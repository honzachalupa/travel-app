import { PlaceActions } from "@/actions/place";
import { PlacesActions } from "@/actions/places";
import { NavigationAppId, Place } from "@/types/map";
import { resolveNavigationUrl } from "@/utils/map";
import { useLocalStorage } from "@honzachalupa/design-system";
import { useCallback, useState } from "react";
import { useAuthorization } from "./useAuthorization";

export const usePlaces = () => {
    const { user, refreshSession } = useAuthorization();

    const [settings, _] = useLocalStorage<{
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

    const fetch = () =>
        PlacesActions.get().then((data) => {
            setPlaces(data);

            return data;
        });

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

    const isUserPlaceOwner = (place: Place) =>
        place?.ownerId === user?.id || user?.role === "ADMIN";

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

    return {
        places,
        fetchPlace: fetchById,
        fetchPlaces: fetch,
        createPlace: create,
        updatePlace: update,
        deletePlace: delete_,
        setIsVisited,
        setIsNotVisited,
        isUserPlaceOwner,
        getNavigationUrl,
    };
};