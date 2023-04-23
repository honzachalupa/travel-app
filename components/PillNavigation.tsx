import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { HamburgerIcon, ListIcon, MarkerPlusIcon, UserIcon } from "@/icons";
import { usePathname, useRouter } from "next/navigation";
import { ContextMenu } from "./ContextMenu";

interface Props {
    onPlacesListClick?: () => void;
    onCreatePlaceClick?: () => void;
}

export const PillNavigation: React.FC<Props> = ({
    onPlacesListClick,
    onCreatePlaceClick,
}) => {
    const router = useRouter();
    const pathName = usePathname();
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
                {onPlacesListClick && (
                    <button
                        title="Všechna místa"
                        type="button"
                        className="w-12 aspect-square"
                        onClick={onPlacesListClick}
                    >
                        <ListIcon className="w-full h-full p-3" />
                    </button>
                )}

                {onCreatePlaceClick && (
                    <button
                        title="Přidat místo"
                        type="button"
                        className="w-12 aspect-square"
                        onClick={onCreatePlaceClick}
                    >
                        <MarkerPlusIcon className="w-full h-full p-3" />
                    </button>
                )}

                <ContextMenu
                    title="Další volby"
                    // @ts-ignore
                    items={[
                        // @ts-ignore
                        pathName !== "/"
                            ? {
                                  label: "Mapa",
                                  onClick: () => router.push("/"),
                              }
                            : null,
                        {
                            label: "Nastavení",
                            onClick: () => router.push("/settings"),
                        },
                        {
                            label: "O aplikaci",
                            onClick: () => router.push("/about"),
                        },
                    ].filter(Boolean)}
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
