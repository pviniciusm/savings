import { Income } from '../domain/entities';
import { IIncomeRepository } from '../domain/repositories/income-repository';

export class InMemoryIncomeRepository implements IIncomeRepository {
    public incomeList: Array<Income>;

    constructor(initialIncomeList?: Array<Income>) {
        if(initialIncomeList) {
            this.incomeList = initialIncomeList;
        } else {
            this.incomeList = [
                new Income(5000, 'Salário', new Date('2021-11-07'), true),
                new Income(20000, 'Growdev', new Date('2021-11-07'), true),
                new Income(100, 'Freela #1', new Date('2021-11-07'), true),
                new Income(500, 'Pix do cliente', new Date('2021-11-07'), true),
            ];
        }
    }

    async create(income: Income): Promise<void> {
        this.incomeList.push(income);
    }

    async list(id?: string): Promise<Array<Income>> {
        return id ? this.incomeList.filter(income => income.getId() == id) : [...this.incomeList];
    }
}
