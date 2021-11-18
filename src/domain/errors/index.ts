export class InvalidValueError extends Error {
    public readonly value?: string;

    constructor(value?: string) {
        super(`${value ?? 'Value'} must be a number and bigger than zero`);
        this.value = value;
    }
}

export class InvalidDescriptionError extends Error {
    constructor() {
        super('Description have less than zero and than 50 characters');
    }
}

export class InvalidDateError extends Error {
    constructor() {
        super('Date is invalid');
    }
}

