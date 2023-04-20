import { IconProps } from "@/types/icon";

export const MarkerIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        viewBox="0 0 1024 1024"
        className={className}
        style={{ filter: "drop-shadow(0 0 1px rgb(0 0 0 / 0.8))" }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M512 85.333333c-164.949333 0-298.666667 133.738667-298.666667 298.666667 0 164.949333 298.666667 554.666667 298.666667 554.666667s298.666667-389.717333 298.666667-554.666667c0-164.928-133.717333-298.666667-298.666667-298.666667z m0 448a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z" />
    </svg>
);
