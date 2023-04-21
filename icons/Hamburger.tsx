import { IconProps } from "@/types/icon";

export const HamburgerIcon: React.FC<IconProps> = (props) => (
    <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M5 7H19"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        <path
            d="M5 12L19 12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        <path
            d="M5 17L19 17"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
