import { IIconProps } from "@honzachalupa/design-system";

export const PointIcon: React.FC<IIconProps> = ({ className }) => (
    <svg
        className={className}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="16" cy="16" r="16" />
    </svg>
);
