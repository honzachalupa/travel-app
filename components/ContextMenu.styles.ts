import cx from "classnames";

export interface ItemsPosition {
    x: "left" | "right";
    y: "top" | "bottom";
}

const container = `
    w-12
    aspect-square
    bg-black
    bg-opacity-20
    backdrop-blur-md
    rounded-full
    cursor-pointer
`;

const itemsContainer = (itemsPosition: ItemsPosition) =>
    cx(
        `
        bg-black
        bg-opacity-20
        backdrop-blur-md
        rounded-md
        flex
        flex-col
        fixed
    `,
        {
            "right-0": itemsPosition.x === "left",
            "left-0": itemsPosition.x === "right",
            "bottom-14": itemsPosition.y === "top",
            "top-14": itemsPosition.y === "bottom",
        }
    );

const item = `
    px-4
    py-2
    text-sm
    border
    border-transparent
    border-b-gray-500
    border-opacity-20
    text-left
    whitespace-nowrap
    cursor-pointer
    sm:text-xl
    sm:px-6 sm:py-3
    last:border-none
    hover:bg-opacity-25
`;

const overlay = `
    w-screen
    h-screen
    absolute
    top-0
    left-0
`;

export const styles = {
    container,
    itemsContainer,
    item,
    overlay,
};
