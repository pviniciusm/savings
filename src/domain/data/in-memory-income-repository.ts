import { Income } from '../entities';
import { IIncomeRepository } from '../repositories/income-repository';

const incomeList: Array<Income> = [];

export class InMemoryIncomeRepository implements IIncomeRepository {
    async create(income: Income): Promise<void> {
        incomeList.push(income);
    }

    async list(id?: string): Promise<Array<Income>> {
        return id ? incomeList.filter(income => income.getId() == id) : [...incomeList];
    }
}
