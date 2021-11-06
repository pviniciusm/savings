export class RequiredFieldError extends Error {
    constructor(public readonly field: string) {
        super(field + ' is required.');
    }
}
