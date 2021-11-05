import { Income } from '../entities';
import { InvalidValueError, InvalidDescriptionError, InvalidDateError } from '../errors';

class CreateIncomeUseCase {
    async execute(
        value: number,
        description: string,
        date: Date,
        paid?: boolean
    ) {
        if (value <= 0) {
            throw new InvalidValueError();
        }

        if (description.length <= 0 || description.length > 50) {
            throw new InvalidDescriptionError();
        }

        const today = new Date();
        if (today.getDate() < date.getDate()) {
            throw new InvalidDateError();
        }

        throw Error('Not implemented yet');
    }
}

export { CreateIncomeUseCase };
