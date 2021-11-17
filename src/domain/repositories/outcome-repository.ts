import { Outcome } from '../entities';
import { IListIncomeDTO } from '../usecases/list-income/list-income-dto';

export interface IOutcomeRepository {
    create(outcome: Outcome): Promise<void>;
    list(filter: IListIncomeDTO): Promise<Array<Outcome>>;
};
