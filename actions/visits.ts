import { IPlace, IPlaceVisit } from "@/types/map";
import { callAPI } from "@/utils/api";
import { IUser } from "@honzachalupa/admin";

const get = (params: { userId: IUser["id"] }): Promise<IPlaceVisit> =>
    callAPI("GET", "/api/travel-app/visits", {
        params: {
            id: params.userId,
            returnFirst: true,
        },
    });

const update = (
    id: IPlace["id"],
    {
        placeIds,
    }: {
        placeIds: IPlace["id"][];
    }
) =>
    callAPI("PATCH", "/api/travel-app/visits", {
        params: {
            id,
        },
        body: {
            placeIds,
        },
    });

const setIsVisited = async ({
    placeId,
    userId,
}: {
    placeId: IPlace["id"];
    userId: IUser["id"];
}) => {
    const { id, placeIds } = await get({ userId });

    return update(id, { placeIds: [...new Set([...placeIds, placeId])] });
};

const setIsNotVisited = async ({
    placeId,
    userId,
}: {
    placeId: IPlace["id"];
    userId: IUser["id"];
}) => {
    const { id, placeIds } = await get({ userId });

    return update(id, {
        placeIds: [...placeIds].filter((id) => id !== placeId),
    });
};

export const VisitsActions = {
    get,
    setIsVisited,
    setIsNotVisited,
};
