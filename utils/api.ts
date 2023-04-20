const callAPI = async (url: string, data: any): Promise<any> => {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData);
    }

    return responseData;
};

export { callAPI };
