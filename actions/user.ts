import { User } from "@/types/user";
import { supabase } from "../utils/supabase";

const create = async (payload: {
    id: string;
    firstName?: string;
    lastName?: string;
}) => {
    const { error } = await supabase.from("users").insert({
        ...payload,
        visitedPlaceIds: [],
        role: "USER",
    });

    if (error) {
        throw new Error(error.message);
    }
};

const get = async (id: string): Promise<User> => {
    const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        throw new Error("Record not found");
    }

    return data as User;
};

const update = async (
    id: string,
    {
        firstName,
        lastName,
    }: {
        firstName: User["firstName"];
        lastName: User["lastName"];
    }
) =>
    supabase
        .from("users")
        .update({
            firstName,
            lastName,
        })
        .eq("id", id);

export const UserActions = {
    create,
    get,
    update,
};
