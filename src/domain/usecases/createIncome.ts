import { Income } from '../entities';

class CreateIncomeUseCase {
    execute(
        value: number,
        description: string,
        date: Date,
        paid?: boolean
    ) {
        const newIncome = new Income(value, description, date, new Date(), paid);
        return newIncome;
    }
}

export { CreateIncomeUseCase };
