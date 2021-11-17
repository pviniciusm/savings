import { ListIncomeUseCase } from './list-income';
import { IListIncomeDTO } from './list-income-dto';

import { InvalidValueError, InvalidDescriptionError, InvalidDateError } from '../../errors';
import { InMemoryIncomeRepository } from '../../../data/in-memory-income-repository';
import { Income } from '../../entities';
import { IIncomeRepository } from '../../repositories/income-repository';

const makeSut = (repository?: IIncomeRepository) => {
    let repo = repository ?? new InMemoryIncomeRepository();
    const sut = new ListIncomeUseCase(repo);

    return { sut };
};

describe('create income use case tests', () => {
    test('should return an income list if no id is provided', async () => {
        const initialRepo = [
            new Income(100, 'Testing 1', new Date('2020-09-09'), true),
            new Income(100, 'Testing 2', new Date('2020-08-09'), true),
            new Income(100, 'Testing 3', new Date('2020-09-19'), false),
        ];
        const repo = new InMemoryIncomeRepository([...initialRepo]);
        
        const { sut } = makeSut(repo);
        expect.assertions(1);

        let income: IListIncomeDTO = { };
        let incomeList: Array<Income> = await sut.execute(income);
        expect(incomeList).toHaveLength(initialRepo.length);
    });

    test('should return an unique income if an id is provided', async () => {
        const initialRepo = [
            new Income(100, 'Testing 1', new Date('2020-09-09'), true),
            new Income(100, 'Testing 2', new Date('2020-08-09'), true),
            new Income(100, 'Testing 3', new Date('2020-09-19'), false),
        ];
        const repo = new InMemoryIncomeRepository([...initialRepo]);
        
        const { sut } = makeSut(repo);

        const idInTest = initialRepo[0].getId();
        let income: IListIncomeDTO = { id: idInTest };
        let incomeList: Array<Income> = await sut.execute(income);
        
        expect(incomeList).toHaveLength(1);
        expect(incomeList[0].getId()).toEqual(idInTest);
    });
});
