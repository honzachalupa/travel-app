import cx from "classnames";
import { ReactNode, useState } from "react";
import { ItemsPosition, styles } from "./ContextMenu.styles";

interface Props {
    title: string;
    items: {
        label: string;
        onClick: () => void;
    }[];
    itemsPosition: ItemsPosition;
    children: ReactNode;
    zIndex?: number;
    className?: string;
}

export const ContextMenu: React.FC<Props> = ({
    title,
    items,
    itemsPosition,
    children,
    zIndex = 10,
    className,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <>
            <button
                title={title}
                type="button"
                className={cx(styles.container, className)}
                style={{ zIndex }}
                onClick={() => setIsExpanded((prevState) => !prevState)}
            >
                {children}

                {isExpanded && (
                    <div className={styles.itemsContainer(itemsPosition)}>
                        {items.map(({ label, onClick }) => (
                            <div
                                key={label}
                                onClick={onClick}
                                className={styles.item}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                )}
            </button>

            {isExpanded && (
                <div
                    className={styles.overlay}
                    style={{ zIndex: zIndex - 1 }}
                    onClick={() => setIsExpanded(false)}
                />
            )}
        </>
    );
};
