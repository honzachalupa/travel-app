import { IconProps } from "@/types/icon";

export const MarkerIcon: React.FC<IconProps> = ({ className, style }) => (
    <svg
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
    >
        <g>
            <g>
                <rect width="48" height="48" fill="none" />
            </g>
            <g>
                <path d="M24,2C14.1,2,7,10.1,7,20S18.5,41.3,22.6,45.4a1.9,1.9,0,0,0,2.8,0C29.5,41.3,41,30.1,41,20S33.9,2,24,2Zm0,22a7,7,0,1,1,7-7A7,7,0,0,1,24,24Z" />
            </g>
        </g>
    </svg>
);
