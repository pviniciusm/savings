import { DomainError } from './domain-error';

export class InvalidValueError extends DomainError {
    public readonly value?: string;

    constructor(value?: string) {
        super(`${value ?? 'Value'} must be a number and bigger than zero`);
        this.value = value;
    }
}

export class InvalidDescriptionError extends DomainError {
    constructor() {
        super('Description have less than zero and than 50 characters');
    }
}

export class InvalidDateError extends DomainError {
    constructor() {
        super('Date is invalid');
    }
}

export class RequiredFieldsError extends DomainError {
    constructor(fields: string) {
        super(`${fields} are required`);
    }
}

