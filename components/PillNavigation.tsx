import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { HamburgerIcon, ListIcon, MarkerPlusIcon, UserIcon } from "@/icons";
import { useRouter } from "next/navigation";
import { ContextMenu } from "./ContextMenu";

interface Props {
    onPlacesListClick: () => void;
}

export const PillNavigation: React.FC<Props> = ({ onPlacesListClick }) => {
    const router = useRouter();
    const { user, signOut } = useSupabaseAuth();

    return (
        <div>
            <ContextMenu
                title="Možnosti"
                items={
                    user
                        ? [
                              {
                                  label: "Odhlásit",
                                  onClick: signOut,
                              },
                          ]
                        : [
                              {
                                  label: "Přihlásit",
                                  onClick: () =>
                                      router.push("/login?mode=sign-in"),
                              },
                              {
                                  label: "Registrovat",
                                  onClick: () =>
                                      router.push("/login?mode=sign-up"),
                              },
                          ]
                }
                itemsPosition={{
                    x: "right",
                    y: "bottom",
                }}
                zIndex={10}
                className="absolute left-3 top-3"
            >
                {user && false ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={`https://dngdtdxmkbxttghitzxk.supabase.co/storage/v1/object/public/profile-images/${user?.id}.jpg`}
                        width={46}
                        height={46}
                        style={{
                            objectFit: "cover",
                        }}
                        className="w-full aspect-square rounded-full"
                        alt={`${user?.firstName} ${user?.lastName} profile image`}
                    />
                ) : (
                    <UserIcon className="w-full h-full p-3" />
                )}
            </ContextMenu>

            <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-full flex fixed right-3 top-3 z-10">
                <button
                    title="Všechna místa"
                    type="button"
                    className="w-12 aspect-square"
                    onClick={onPlacesListClick}
                >
                    <ListIcon className="w-full h-full p-3" />
                </button>

                <button
                    title="Přidat místo"
                    type="button"
                    className="w-12 aspect-square"
                    onClick={() => router.push("/create-place")}
                >
                    <MarkerPlusIcon className="w-full h-full p-3" />
                </button>

                <ContextMenu
                    title="Další volby"
                    items={[
                        {
                            label: "Nastavení",
                            onClick: () => router.push("/"),
                        },
                        {
                            label: "O aplikaci",
                            onClick: () => router.push("/"),
                        },
                    ]}
                    itemsPosition={{
                        x: "left",
                        y: "bottom",
                    }}
                    className="bg-transparent backdrop-blur-none"
                >
                    <HamburgerIcon className="w-full h-full p-3" />
                </ContextMenu>
            </div>
        </div>
    );
};
