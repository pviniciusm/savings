import { InMemoryIncomeRepository } from '../../data/in-memory-income-repository';
import { Income } from '../../entities';
import { InvalidValueError, InvalidDescriptionError, InvalidDateError } from '../../errors';
import { IIncomeRepository } from '../../repositories/income-repository';
import { ICreateIncomeDTO } from './create-income-dto';


class CreateIncomeUseCase {

    constructor(private readonly repository: IIncomeRepository) { }

    async execute(user: ICreateIncomeDTO): Promise<Income> {
        if (user.value <= 0) {
            throw new InvalidValueError();
        }

        if (user.description.length <= 0 || user.description.length > 50) {
            throw new InvalidDescriptionError();
        }

        const today = new Date();
        if (today < user.date) {
            throw new InvalidDateError();
        }

        let newIncome = new Income(user.value, user.description, user.date, user.paid);
        this.repository.create(newIncome);

        return newIncome;
    }
}

export { CreateIncomeUseCase };
