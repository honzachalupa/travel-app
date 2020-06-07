import { useEffect, useState } from "react";

export default () => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const getDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        getDimensions();

        window.addEventListener('resize', getDimensions);

        return () => {
            window.removeEventListener('resize', getDimensions);
        };
    }, []);

    return {
        width,
        height
    };
};
