import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { HamburgerIcon, ListIcon, MarkerPlusIcon, UserIcon } from "@/icons";
import { usePathname, useRouter } from "next/navigation";
import { ContextMenu } from "./ContextMenu";

interface Props {
    className?: string;
    onPlacesListClick?: () => void;
    onCreatePlaceClick?: () => void;
}

export const PillNavigation: React.FC<Props> = ({
    className,
    onPlacesListClick,
    onCreatePlaceClick,
}) => {
    const router = useRouter();
    const pathName = usePathname();
    const { user, signOut } = useSupabaseAuth();

    return (
        <div className={className}>
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
                {user ? (
                    <p className="text-xl font-medium accent-foreground">
                        {user.firstName.substring(0, 1)}
                        {user.lastName.substring(0, 1)}
                    </p>
                ) : (
                    <UserIcon className="w-full h-full p-3" />
                )}
            </ContextMenu>

            <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-full flex absolute right-3 top-3 z-10">
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
