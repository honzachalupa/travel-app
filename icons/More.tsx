import { IIconProps } from "@honzachalupa/design-system";

export const MoreIcon: React.FC<IIconProps> = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <g id="Complete">
            <g id="F-More">
                <path
                    d="M8,12a2,2,0,1,1-2-2A2,2,0,0,1,8,12Zm10-2a2,2,0,1,0,2,2A2,2,0,0,0,18,10Zm-6,0a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"
                    id="Horizontal"
                />
            </g>
        </g>
    </svg>
);
