import { ControllerError } from './controller-error';

export class RequiredFieldError extends ControllerError {
    constructor(public readonly field: string) {
        super(field + ' is required.');
    }
}
