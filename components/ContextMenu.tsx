import { useClickOutside, useToggle } from "@honzachalupa/design-system";
import cx from "classnames";
import { ReactNode, useRef } from "react";

interface Item {
    label: string;
    href?: string;
    onClick?: () => void;
}

interface IProps {
    title: string;
    items: (Item | null)[];
    itemsPosition: {
        x: "left" | "right";
        y: "top" | "bottom";
    };
    children: ReactNode;
    zIndex?: number;
    className?: string;
}

export const ContextMenu: React.FC<IProps> = ({
    title,
    items,
    itemsPosition,
    children,
    zIndex = 99999,
    className,
}) => {
    const {
        bool: isExpanded,
        toggle: toggleIsExpanded,
        setFalse: setIsExpandedFalse,
    } = useToggle(false);

    const ref = useRef<HTMLButtonElement>(null);

    useClickOutside(ref, () => {
        setIsExpandedFalse();
    });

    const itemStyles = `
        px-4
        py-2
        text-sm
        border
        border-transparent
        border-b-gray-500
        border-opacity-20
        text-left
        no-underline
        whitespace-nowrap
        cursor-pointer
        sm:text-xl
        sm:px-6 sm:py-3
        last:border-none
        hover:bg-opacity-25
    `;

    return (
        <button
            ref={ref}
            title={title}
            type="button"
            className={cx(
                "w-12 aspect-square theme-glass-effect bg-black bg-opacity-20 rounded-full cursor-pointer",
                className
            )}
            style={{ zIndex }}
            onClick={toggleIsExpanded}
        >
            {children}

            {isExpanded && (
                <div
                    className={cx(
                        "theme-glass-effect rounded-md flex flex-col absolute",
                        {
                            "right-0": itemsPosition.x === "left",
                            "left-0": itemsPosition.x === "right",
                            "bottom-14": itemsPosition.y === "top",
                            "top-14": itemsPosition.y === "bottom",
                        }
                    )}
                >
                    {(items.filter(Boolean) as Item[]).map(
                        ({ label, href, onClick }) =>
                            onClick ? (
                                <div
                                    key={label}
                                    onClick={onClick}
                                    className={itemStyles}
                                >
                                    {label}
                                </div>
                            ) : (
                                <a
                                    key={label}
                                    href={href}
                                    className={itemStyles}
                                >
                                    {label}
                                </a>
                            )
                    )}
                </div>
            )}
        </button>
    );
};
