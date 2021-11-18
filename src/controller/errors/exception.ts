export const Exception = (err: any): any => {
    return {
        ok: false,
        message: err.toString(),
        exception: true
    };
};
