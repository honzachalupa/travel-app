import { IPlace, IPlaceVisit } from "@/types/map";
import { resolveAdminApiUrl } from "@/utils/api";
import { IUser } from "@honzachalupa/admin";

const get = (params: { userId: IUser["id"] }): Promise<IPlaceVisit> =>
    fetch(
        resolveAdminApiUrl(
            `/api/travel-app/visited-places?id=${params.userId}&single=true`
        ),
        {
            method: "GET",
        }
    ).then((response) => response.json());

const update = async (
    id: IPlace["id"],
    {
        placeIds,
    }: {
        placeIds: IPlace["id"][];
    }
) =>
    fetch(resolveAdminApiUrl(`/api/travel-app/visited-places?id=${id}`), {
        method: "PATCH",
        body: JSON.stringify({
            placeIds,
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());

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
