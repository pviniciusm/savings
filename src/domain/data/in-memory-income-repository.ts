import { Income } from '../entities';
import { IIncomeRepository } from '../repositories/income-repository';

const incomeList: Array<Income> = [
    new Income(5000, 'Salário', new Date('2021-11-07'), true),
    new Income(20000, 'Growdev', new Date('2021-11-07'), true),
    new Income(100, 'Freela #1', new Date('2021-11-07'), true),
    new Income(500, 'Pix do cliente', new Date('2021-11-07'), true),
    
];

export class InMemoryIncomeRepository implements IIncomeRepository {
    async create(income: Income): Promise<void> {
        incomeList.push(income);
    }

    async list(id?: string): Promise<Array<Income>> {
        return id ? incomeList.filter(income => income.getId() == id) : [...incomeList];
    }
}
