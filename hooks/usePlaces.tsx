import { PlaceActions } from "@/actions/place";
import { PlacesActions } from "@/actions/places";
import { Coordinates } from "@/components/Map/Map.types";
import { NavigationAppId, Place } from "@/types/map";
import { resolveNavigationUrl } from "@/utils/map";
import { useGeoLocation, useLocalStorage } from "@honzachalupa/design-system";
import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";
import { getAirDistance as getAirDistanceUtil } from "./usePlaces.utils";

export const usePlaces = () => {
    const { user, refreshSession } = useAuth();
    const currentLocation = useGeoLocation();

    const [settings] = useLocalStorage<{
        navigationApp: NavigationAppId;
    }>("settings", {
        navigationApp: "apple-maps",
    });

    const [places, setPlaces] = useState<Place[]>([]);

    const getAirDistance = useCallback(
        (coordinates: Coordinates) =>
            getAirDistanceUtil(currentLocation, coordinates),
        [currentLocation]
    );

    const create = (payload: Omit<Place, "id">) => PlaceActions.create(payload);

    const update = (
        placeId: Place["id"],
        payload: Omit<Place, "id" | "ownerId">
    ) => PlaceActions.update(placeId, payload);

    const delete_ = (placeId: Place["id"]) => PlaceActions.delete(placeId);

    const fetch = () =>
        PlacesActions.get().then((data) => {
            const sorted = data.sort((a, b) => {
                const distanceA = getAirDistance(a.coordinates);
                const distanceB = getAirDistance(b.coordinates);

                return distanceA - distanceB;
            });

            setPlaces(sorted);

            return sorted;
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
