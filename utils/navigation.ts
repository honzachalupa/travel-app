export const applySearchParams = (
    path: string,
    params: { [key: string]: string | undefined }
) => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (typeof value === "string") {
            searchParams.set(key, value);
        }
    });

    return `${path}?${searchParams.toString()}`;
};
