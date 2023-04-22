import { UsersActions } from "@/actions/users";
import { User } from "@/types/user";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export const useSupabaseAuth = () => {
    const [user, setUser] = useState<User | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getSession = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            throw error;
        }

        if (data.session) {
            const { error } = await supabase.auth.setSession(data.session);

            if (error) {
                throw error;
            }
        } else {
            setIsLoading(false);
        }
    };

    const signUp = async ({
        firstName,
        lastName,
        emailAddress,
        password,
    }: {
        firstName?: string;
        lastName?: string;
        emailAddress: string;
        password: string;
    }) => {
        const { data, error } = await supabase.auth.signUp({
            email: emailAddress,
            password,
        });

        if (error) {
            throw error;
        }

        if (firstName || lastName) {
            UsersActions.create({
                id: data.user!.id,
                firstName,
                lastName,
            });
        }
    };

    const signIn = async ({
        emailAddress,
        password,
    }: {
        emailAddress: string;
        password: string;
    }) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: emailAddress,
            password,
        });

        if (error) {
            throw error;
        }
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }

        setUser(null);
    };

    useEffect(() => {
        getSession();

        supabase.auth.onAuthStateChange(async (e, session) => {
            if (session) {
                const { id, email } = session.user;

                const { firstName, lastName, visitedPlaceIds } =
                    await UsersActions.get(id);

                if (firstName || lastName) {
                    setUser({
                        id,
                        emailAddress: email!,
                        firstName: firstName || "",
                        lastName: lastName || "",
                        visitedPlaceIds: visitedPlaceIds || [],
                    });
                }

                setIsLoading(false);
            }
        });
    }, []);

    return {
        user,
        isLoading,
        signUp,
        signIn,
        signOut,
    };
};
