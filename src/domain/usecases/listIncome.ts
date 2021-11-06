import { InMemoryIncomeRepository } from '../data/in-memory-income-repository';
import { Income } from '../entities';
import { IIncomeRepository } from '../repositories/income-repository';

export class ListIncomeUseCase {
    private repository: IIncomeRepository;

    constructor(repository?: IIncomeRepository) {
        this.repository = repository ?? new InMemoryIncomeRepository();
    }

    async execute(id?: string): Promise<Array<Income>> {
        return this.repository.list(id);
    }
}
