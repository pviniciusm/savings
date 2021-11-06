import { Income } from '../entities';

export interface IIncomeRepository {
    create(income: Income): Promise<void>;
    list(id?: string): Promise<Array<Income>>;
};
