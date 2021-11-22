const getErrorMessage = (error) => {
    if (error instanceof Error)
        return error.message;
    return String(error);
};
const reportError = ({ message }) => {
    // send the error to our logging service...
};
export { getErrorMessage, reportError };
