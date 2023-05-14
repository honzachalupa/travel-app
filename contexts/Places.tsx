import { PlaceActions } from "@/actions/place";
import { PlacesActions } from "@/actions/places";
import { VisitsActions } from "@/actions/visits";
import { ICoordinates } from "@/components/Map/Map.types";
import { IPlace, TNavigationAppId } from "@/types/map";
import { getAirDistance, resolveNavigationUrl } from "@/utils/map";
import { useLocalStorage } from "@honzachalupa/design-system";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { AppContext } from "./App";

interface IPlaceContext {
    places: IPlace[];
    visitedPlaceIds: IPlace["id"][];
    fetchPlace: (id: IPlace["id"]) => Promise<IPlace>;
    refetchPlaces: () => Promise<IPlace[]>;
    createPlace: (payload: Omit<IPlace, "id">) => Promise<any>;
    updatePlace: (
        placeId: IPlace["id"],
        payload: Omit<IPlace, "id" | "ownerId">
    ) => Promise<any>;
    deletePlace: (placeId: IPlace["id"]) => Promise<any>;
    getNavigationUrl: (place: IPlace) => string | undefined;
    isPlaceVisited: (id: IPlace["id"]) => boolean;
    isUserPlaceOwner: (place: IPlace) => boolean;
    setIsVisited: (placeId: IPlace["id"]) => void;
    setIsNotVisited: (placeId: IPlace["id"]) => void;
}

const initialContext: IPlaceContext = {
    places: [],
    visitedPlaceIds: [],
    fetchPlace: () => new Promise(() => {}),
    refetchPlaces: () => new Promise(() => {}),
    createPlace: () => new Promise(() => {}),
    updatePlace: () => new Promise(() => {}),
    deletePlace: () => new Promise(() => {}),
    getNavigationUrl: () => "",
    isPlaceVisited: () => false,
    isUserPlaceOwner: () => false,
    setIsVisited: () => {},
    setIsNotVisited: () => {},
};

export const PlacesContext = createContext<IPlaceContext>(initialContext);

export const PlacesContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const { user, currentLocation } = useContext(AppContext);

    const [settings] = useLocalStorage<{
        navigationApp: TNavigationAppId;
    }>("settings", {
        navigationApp: "apple-maps",
    });

    const [context, setContext] = useState<IPlaceContext>(initialContext);

    const fetchPlaces = useCallback(
        () =>
            PlacesActions.get().then((data) => {
                const sorted = data.sort((a, b) => {
                    const distanceA = getAirDistance(
                        currentLocation as ICoordinates,
                        a.coordinates
                    );

                    const distanceB = getAirDistance(
                        currentLocation as ICoordinates,
                        b.coordinates
                    );

                    return distanceA - distanceB;
                });

                setContext((prevState) => ({
                    ...prevState,
                    places: sorted,
                }));

                return sorted;
            }),
        [currentLocation]
    );

    const fetchVisits = useCallback(
        async () =>
            user
                ? await VisitsActions.get({ userId: user.id })
                      .then(({ placeIds: visitedPlaceIds }) => {
                          setContext((prevState) => ({
                              ...prevState,
                              visitedPlaceIds,
                          }));

                          return visitedPlaceIds;
                      })
                      .catch(() => [])
                : [],
        [user]
    );

    const create = (payload: Omit<IPlace, "id">) =>
        PlaceActions.create(payload).then(() => {
            fetchPlaces();
        });

    const update = (
        placeId: IPlace["id"],
        payload: Omit<IPlace, "id" | "ownerId">
    ) =>
        PlaceActions.update(placeId, payload).then(() => {
            fetchPlaces();
        });

    const delete_ = (placeId: IPlace["id"]) =>
        PlaceActions.delete(placeId).then(() => {
            fetchPlaces();
        });

    const fetchById = (id: IPlace["id"]) => PlaceActions.get({ id });

    const setIsVisited = (placeId: IPlace["id"]) => {
        if (user) {
            VisitsActions.setIsVisited({
                placeId,
                userId: user.id,
            }).then(() => {
                fetchVisits();
            });
        } else {
            throw new Error("User is not signed in.");
        }
    };

    const setIsNotVisited = (placeId: IPlace["id"]) => {
        if (user) {
            VisitsActions.setIsNotVisited({
                placeId,
                userId: user.id,
            }).then(() => {
                fetchVisits();
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

    const isPlaceVisited = (id: IPlace["id"]) =>
        context.visitedPlaceIds.includes(id) || false;

    const isUserPlaceOwner = (place: IPlace) =>
        place?.ownerId === user?.id || user?.role === "ADMIN";

    useEffect(() => {
        fetchPlaces();
        fetchVisits();
    }, [user]);

    const value: IPlaceContext = {
        ...context,
        fetchPlace: fetchById,
        // refetchPlaces: fetchPlaces,
        createPlace: create,
        updatePlace: update,
        deletePlace: delete_,
        getNavigationUrl,
        isPlaceVisited,
        isUserPlaceOwner,
        setIsVisited,
        setIsNotVisited,
    };

    return (
        <PlacesContext.Provider value={value}>
            {children}
        </PlacesContext.Provider>
    );
};
