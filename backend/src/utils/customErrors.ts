export const ServerError = (message: string) => {
    const e = new Error(message);
    e.name = "ServerError";
    return e;
};

export const UserInputError = (message: string) => {
    const e = new Error(message);
    e.name = "UserInputError";
    return e;
};