import { CreateIncomeUseCase } from './create-income';
import { InvalidValueError, InvalidDescriptionError, InvalidDateError } from '../../errors';
import { addDaysToDate } from '../../infra/add-days-to-date';
import { Income } from '../../entities';
import { ICreateIncomeDTO } from './create-income-dto';
import { InMemoryIncomeRepository } from '../../data/in-memory-income-repository';

const makeSut = () => {
    const sut = new CreateIncomeUseCase(new InMemoryIncomeRepository());
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const okIncome: ICreateIncomeDTO = {
        value: 20,
        description: 'Purchase at Zaffari',
        date: yesterday,
        paid: false
    };

    return { sut, okIncome };
};

describe('create income use case tests', () => {
    test('should throw InvalidValueError if value is less than 1', async () => {
        const { sut, okIncome } = makeSut();
        expect.assertions(1);

        let income: ICreateIncomeDTO = { ...okIncome, value: 0 };
        sut.execute(income).catch((err) => {
            expect(err).toBeInstanceOf(InvalidValueError);
        });

    });

    test('should throw InvalidDescriptionError if description length is invalid', async () => {
        const { sut, okIncome } = makeSut();
        expect.assertions(2);

        let income: ICreateIncomeDTO = { ...okIncome, description: '' };
        try {
            await sut.execute(income);
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidDescriptionError);
        }

        income = { ...okIncome, description: ''.padStart(51, '0') };
        try {
            await sut.execute(income);
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidDescriptionError);
        }
    });

    test('should throw InvalidDateError if provided date is on future', async () => {
        const { sut, okIncome } = makeSut();
        expect.assertions(1);

        let tomorrow = addDaysToDate(new Date(), 1);
        let income: ICreateIncomeDTO = { ...okIncome, date: tomorrow };

        try {
            await sut.execute(income);
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidDateError);
        }
    });

    test('should return created income object if all provided data is ok', async () => {
        const { sut, okIncome } = makeSut();

        let income: ICreateIncomeDTO = { ...okIncome };
        let createdIncome: Income = await sut.execute(income);
        expect(createdIncome).not.toBeNull();
        expect(createdIncome).toBeInstanceOf(Income);
        expect(createdIncome.description).toEqual(income.description);
    });

    test('should return created income object if all provided data is ok and date is today', async () => {
        const { sut, okIncome } = makeSut();

        let income: ICreateIncomeDTO = { ...okIncome, date: new Date() };
        let createdIncome: Income = await sut.execute(income);
        expect(createdIncome).not.toBeNull();
        expect(createdIncome).toBeInstanceOf(Income);
        expect(createdIncome.description).toEqual(income.description);
    });

    test('should return created income object if all provided data is ok and date is one year ago', async () => {
        const { sut, okIncome } = makeSut();

        let income: ICreateIncomeDTO = { ...okIncome, date: addDaysToDate(new Date(), -365) };
        let createdIncome: Income = await sut.execute(income);
        expect(createdIncome).not.toBeNull();
        expect(createdIncome).toBeInstanceOf(Income);
        expect(createdIncome.description).toEqual(income.description);
    });
});
