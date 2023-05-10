import { IIconProps } from "@honzachalupa/design-system";

export const HamburgerIcon: React.FC<IIconProps> = (props) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M5 7H19"
            stroke="#e11d48"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        <path
            d="M5 12L19 12"
            stroke="#e11d48"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        <path
            d="M5 17L19 17"
            stroke="#e11d48"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
