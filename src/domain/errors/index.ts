class InvalidValueError extends Error {
    constructor() {
        super('Value must be a number and bigger than zero');
    }
}

class InvalidDescriptionError extends Error {
    constructor() {
        super('Description have less than zero and than 50 characters');
    }
}

class InvalidDateError extends Error {
    constructor() {
        super('Date is invalid');
    }
}

export {
    InvalidValueError,
    InvalidDescriptionError,
    InvalidDateError
};
