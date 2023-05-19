import { useNavigation } from "@/hooks/useNavigation";
import { HamburgerIcon, ListIcon, MarkerPlusIcon, UserIcon } from "@/icons";
import { AuthContext } from "@honzachalupa/admin";
import cx from "classnames";
import { useContext } from "react";
import { AppContext } from "../contexts/App";
import { ContextMenu } from "./ContextMenu";

interface IProps {
    className?: string;
    isTransparent?: boolean;
    onPlacesListClick?: () => void;
    onCreatePlaceClick?: () => void;
}

export const Navigation: React.FC<IProps> = ({
    className,
    isTransparent,
    onPlacesListClick,
    onCreatePlaceClick,
}) => {
    const { location, navigateTo } = useNavigation();
    const { signOut } = useContext(AuthContext);

    const { user } = useContext(AppContext);

    return (
        <div className={className}>
            <ContextMenu
                title="Možnosti"
                items={
                    user
                        ? [
                              {
                                  label: "Profil",
                                  onClick: navigateTo.profile,
                              },
                              {
                                  label: "Odhlásit",
                                  onClick: signOut,
                              },
                          ]
                        : [
                              {
                                  label: "Přihlásit",
                                  onClick: () =>
                                      navigateTo.login({ mode: "sign-in" }),
                              },
                              {
                                  label: "Registrovat",
                                  onClick: () =>
                                      navigateTo.login({ mode: "sign-up" }),
                              },
                          ]
                }
                itemsPosition={{
                    x: "right",
                    y: "bottom",
                }}
                zIndex={10}
                className={cx("absolute left-3 top-3", {
                    "bg-transparent": isTransparent,
                })}
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

            <div
                className={cx("rounded-full flex absolute right-3 top-3 z-10", {
                    "theme-glass-effect": !isTransparent,
                })}
            >
                {onCreatePlaceClick && (
                    <button
                        title="Přidat místo"
                        type="button"
                        className="w-12 aspect-square"
                        onClick={onCreatePlaceClick}
                    >
                        <MarkerPlusIcon className="w-full h-full accent-foreground p-3" />
                    </button>
                )}

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

                <ContextMenu
                    title="Další volby"
                    items={[
                        location?.pathname !== "/"
                            ? {
                                  label: "Mapa",
                                  onClick: navigateTo.home,
                              }
                            : null,
                        {
                            label: "Nastavení",
                            onClick: navigateTo.settings,
                        },
                        {
                            label: "O aplikaci",
                            onClick: navigateTo.about,
                        },
                    ]}
                    itemsPosition={{
                        x: "left",
                        y: "bottom",
                    }}
                    className="!bg-transparent !backdrop-blur-none"
                >
                    <HamburgerIcon className="w-full h-full p-3" />
                </ContextMenu>
            </div>
        </div>
    );
};
