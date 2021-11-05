import { Income } from '../entities';

class CreateIncomeUseCase {
    async execute(
        value: number,
        description: string,
        date: Date,
        paid?: boolean
    ) {
        if (value <= 0) {
            throw new Error('Value must be bigger than zero');
        }

        throw Error('Not implemented yet');
    }
}

export { CreateIncomeUseCase };
