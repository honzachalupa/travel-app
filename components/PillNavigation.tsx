import { ListIcon, SettingsIcon } from "@/icons";

interface Props {
    onPlacesListClick: () => void;
    onSettingsClick?: () => void;
}

export const PillNavigation: React.FC<Props> = ({
    onPlacesListClick,
    onSettingsClick = () => {},
}) => {
    const items = [
        {
            label: "Places list",
            onClick: onPlacesListClick,
            icon: <ListIcon className="w-full h-full accent-foreground" />,
        },
        {
            label: "Settings",
            onClick: onSettingsClick,
            icon: <SettingsIcon className="w-full h-full stroke-rose-600" />,
        },
    ];

    return (
        <div
            className="bg-black bg-opacity-20 backdrop-blur-md rounded-full flex flex-row absolute top-3 right-3 z-10"
            style={{ filter: "drop-shadow(0 0 1px rgb(0 0 0 / 0.8))" }}
        >
            {items.map(({ label, icon, onClick }) => (
                <div
                    key={label}
                    title={label}
                    className="w-10 p-[10px] aspect-square"
                    onClick={onClick}
                >
                    {icon}
                </div>
            ))}
        </div>
    );
};
