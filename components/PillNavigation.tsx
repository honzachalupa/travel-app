import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { HamburgerIcon, ListIcon, MarkerPlusIcon, UserIcon } from "@/icons";
import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    onPlacesListClick: () => void;
}

export const PillNavigation: React.FC<Props> = ({ onPlacesListClick }) => {
    const router = useRouter();
    const { user, signOut } = useSupabaseAuth();

    console.log({ user });

    const [isProfileExpanded, setIsProfileExpanded] = useState<boolean>(false);
    const [isMoreExpanded, setIsMoreExpanded] = useState<boolean>();

    const onMoreClick = () => {
        setIsMoreExpanded((prevState) => !prevState);
    };

    const items = [
        {
            label: "Všechna místa",
            onClick: onPlacesListClick,
            icon: <ListIcon className="w-full h-full accent-foreground" />,
        },
        {
            label: "Přidat místo",
            onClick: () => router.push("/create-place"),
            icon: (
                <MarkerPlusIcon className="w-full h-full accent-foreground" />
            ),
        },
        {
            label: "Další volby",
            onClick: onMoreClick,
            icon: <HamburgerIcon className="w-full h-full stroke-rose-600" />,
        },
    ];

    return (
        <div className="flex absolute top-3 right-3 z-10">
            <div className="flex flex-col items-end">
                <div
                    className="w-[46px] h-[46px] bg-black bg-opacity-20 backdrop-blur-md rounded-full cursor-pointer overflow-hidden"
                    onClick={() =>
                        setIsProfileExpanded((prevState) => !prevState)
                    }
                >
                    {user ? (
                        <Image
                            src={`https://dngdtdxmkbxttghitzxk.supabase.co/storage/v1/object/public/profile-images/${user.id}.jpg`}
                            width={46}
                            height={46}
                            style={{
                                objectFit: "cover",
                            }}
                            className="w-full aspect-square"
                            alt={`${user.firstName} ${user.lastName} profile image`}
                        />
                    ) : (
                        <div className="w-9 sm:w-12 p-3 aspect-square">
                            <UserIcon className="w-full h-full" />
                        </div>
                    )}
                </div>

                <div
                    className={cx(
                        "backdrop-blur-md flex flex-col mt-3 relative right-[-10px] opacity-0 scale-90 transition-all before:content-[''] before:w-0 before:h-0 before:border before:border-t-0 before:border-r-[15px] before:border-b-[8px] before:border-l-[15px] before:border-transparent before:border-b-[#c6c6c7] before:dark:border-b-[#222222] before:absolute before:-top-[8px] before:right-[18px]",
                        {
                            "!opacity-100 !scale-100": isProfileExpanded,
                        }
                    )}
                >
                    {[
                        {
                            label: "Přihlásit",
                            onClick: () => router.push("/login?mode=sign-in"),
                        },
                        {
                            label: "Registrovat",
                            onClick: () => router.push("/login?mode=sign-up"),
                        },
                        {
                            label: "Odhlásit",
                            onClick: () => signOut(),
                        },
                    ].map(({ label, onClick }) => (
                        <div
                            key={label}
                            onClick={onClick}
                            className="bg-black bg-opacity-20 px-4 py-2 text-sm border border-transparent border-b-gray-500 border-opacity-20 cursor-pointer sm:text-xl sm:px-6 sm:py-3 first:rounded-t-md last:border-none last:rounded-b-md hover:bg-opacity-25"
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-end">
                <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-full flex px-3">
                    {items.map(({ label, icon, onClick }) => (
                        <div
                            key={label}
                            title={label}
                            className="w-9 sm:w-12 p-1.5 aspect-square cursor-pointer mr-3 last:mr-0"
                            onClick={onClick}
                        >
                            {icon}
                        </div>
                    ))}
                </div>

                <div
                    className={cx(
                        "backdrop-blur-md flex flex-col mt-3 relative opacity-0 scale-90 transition-all before:content-[''] before:w-0 before:h-0 before:border before:border-t-0 before:border-r-[15px] before:border-b-[8px] before:border-l-[15px] before:border-transparent before:border-b-[#c6c6c7] before:dark:border-b-[#222222] before:absolute before:-top-[8px] before:right-[18px]",
                        {
                            "!opacity-100 !scale-100": isMoreExpanded,
                        }
                    )}
                >
                    {[
                        {
                            label: "Navštívená místa",
                            onClick: () => {},
                        },
                        {
                            label: "Nastavení",
                            onClick: () => {},
                        },
                        {
                            label: "O projektu",
                            onClick: () => {},
                        },
                    ].map(({ label, onClick }) => (
                        <div
                            key={label}
                            onClick={onClick}
                            className="bg-black bg-opacity-20 px-4 py-2 text-sm border border-transparent border-b-gray-500 border-opacity-20 cursor-pointer sm:text-xl sm:px-6 sm:py-3 first:rounded-t-md last:border-none last:rounded-b-md hover:bg-opacity-25"
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
