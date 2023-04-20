import { IconProps } from "@/types/icon";

export const CurrentLocationIcon: React.FC<IconProps> = ({
    color,
    className,
}) => (
    <svg
        fill={color}
        className={className}
        width="800px"
        height="800px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="16" cy="16" r="16" />
    </svg>
);
