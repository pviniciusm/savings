import { InMemoryIncomeRepository } from '../data/in-memory-income-repository';
import { Income } from '../entities';
import { InvalidValueError, InvalidDescriptionError, InvalidDateError } from '../errors';
import { IIncomeRepository } from '../repositories/income-repository';


class CreateIncomeUseCase {
    private repository: IIncomeRepository;

    constructor(repository?: IIncomeRepository) {
        this.repository = repository ?? new InMemoryIncomeRepository();
    }

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

        let newIncome = new Income(value, description, date, paid);
        this.repository.create(newIncome);

        return newIncome;
    }
}

export { CreateIncomeUseCase };
