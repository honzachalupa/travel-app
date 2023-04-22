import { IconProps } from "@/types/icon";

export const MarkerPlusIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g>
            <g>
                <rect width="48" height="48" fill="none" />
                <rect width="48" height="48" fill="none" />
                <rect width="48" height="48" fill="none" />
            </g>
            <g>
                <path
                    fill="#e11d48"
                    d="M24,2C14.1,2,7,10.1,7,20S18.5,41.3,22.6,45.4a1.9,1.9,0,0,0,2.8,0C29.5,41.3,41,30.1,41,20S33.9,2,24,2Zm6,21H26v4a2,2,0,0,1-4,0V23H18a2,2,0,0,1,0-4h4V15a2,2,0,0,1,4,0v4h4a2,2,0,0,1,0,4Z"
                />
            </g>
        </g>
    </svg>
);