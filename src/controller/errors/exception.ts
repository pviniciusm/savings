export function exception(err: any): any {
    return {
        ok: false,
        message: err.toString(),
        exception: true
    };
}
