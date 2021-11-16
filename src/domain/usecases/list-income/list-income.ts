import { InMemoryIncomeRepository } from '../../data/in-memory-income-repository';
import { Income } from '../../entities';
import { IIncomeRepository } from '../../repositories/income-repository';
import { IListIncomeDTO } from './list-income-dto';

export class ListIncomeUseCase {
    private repository: IIncomeRepository;

    constructor(repository: IIncomeRepository) {
        this.repository = repository;
    }

    async execute(filter: IListIncomeDTO): Promise<Array<Income>> {
        return await this.repository.list(filter.id);
    }
}
