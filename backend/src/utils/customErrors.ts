// A couple of custom errors. One for server-side errors and one for users' errors.

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