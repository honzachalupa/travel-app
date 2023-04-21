import { IconProps } from "@/types/icon";
import "./CreatePlace.css";

export const CreatePlaceIcon: React.FC<IconProps> = ({ className }) => (
    <svg viewBox="0 0 24 24" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
        <line className="cls-1" x1="7.23" y1="10.07" x2="16.77" y2="10.07" />
        <line className="cls-1" x1="12" y1="5.3" x2="12" y2="14.84" />
        <path
            className="cls-1"
            d="M18.68,1.48H5.32A3.82,3.82,0,0,0,1.5,5.3v9.54a3.82,3.82,0,0,0,3.82,3.82H9.14L12,21.52l2.86-2.86h3.82a3.82,3.82,0,0,0,3.82-3.82V5.3A3.82,3.82,0,0,0,18.68,1.48Z"
        />
    </svg>
);
