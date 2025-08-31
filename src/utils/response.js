export const success = (data, method) => {
    return {
        status: method.toLowerCase() === "get" ? 200 : 201,
        success: true,
        message:
            method.toLowerCase() === "get"
                ? "Data fetched successfully"
                : "Data processed successfully",
        data,
    };
};
export const error = (message = 'Something went wrong', status = 500) => {
    return {
        status,
        success: false,
        message,
    };
};

export const invalidParameter = (message = "Invalid parameter") => {
    return {
        status: 400,
        success: false,
        message,
    };
};