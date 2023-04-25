import { PlaceActions } from "@/actions/place";
import { PlacesActions } from "@/actions/places";
import { NavigationAppId, Place } from "@/types/map";
import { User } from "@/types/user";
import { resolveNavigationUrl } from "@/utils/map";
import { useCallback, useState } from "react";
import { useAuthorization } from "./useAuthorization";
import { useLocalStorage } from "./useLocalStorage";

export const usePlaces = () => {
    const { refreshSession } = useAuthorization();

    const [settings, _] = useLocalStorage<{
        navigationApp: NavigationAppId;
    }>("settings", {
        navigationApp: "apple-maps",
    });

    const [places, setPlaces] = useState<Place[]>([]);

    const fetch = () =>
        PlacesActions.get({}).then((data) => {
            setPlaces(data);

            return data;
        });

    const fetchById = (id: Place["id"]) => PlacesActions.get({ id });

    const setIsVisited = (placeId: Place["id"], userId: User["id"]) => {
        PlaceActions.setIsVisited({
            placeId,
            userId,
        }).then(() => {
            refreshSession();
        });
    };

    const setIsNotVisited = (placeId: Place["id"], userId: User["id"]) => {
        PlaceActions.setIsNotVisited({
            placeId,
            userId,
        }).then(() => {
            refreshSession();
        });
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

    return {
        places,
        fetchPlace: fetchById,
        fetchPlaces: fetch,
        setIsVisited,
        setIsNotVisited,
        getNavigationUrl,
    };
};
