import { CreateIncomeUseCase } from './createIncome';
import { InvalidValueError, InvalidDescriptionError, InvalidDateError } from '../errors';

const makeSut = () => {
    const sut = new CreateIncomeUseCase();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const okIncome = {
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

        let income = { ...okIncome, value: 0 };
        sut.execute(income.value, income.description, income.date, income.paid).catch((err) => {
            expect(err).toBeInstanceOf(InvalidValueError);
        });

    });

    test('should throw InvalidDescriptionError if description length is invalid', async () => {
        const { sut, okIncome } = makeSut();
        expect.assertions(2);

        let income = { ...okIncome, description: '' };
        try {
            await sut.execute(income.value, income.description, income.date, income.paid);
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidDescriptionError);
        }

        income = { ...okIncome, description: ''.padStart(51, '0') };
        try {
            await sut.execute(income.value, income.description, income.date, income.paid);
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidDescriptionError);
        }
    });

    test('should throw InvalidDateError if provided date is on future', async () => {
        const { sut, okIncome } = makeSut();
        expect.assertions(1);

        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        let income = { ...okIncome, date: tomorrow };
        try {
            await sut.execute(income.value, income.description, income.date, income.paid);
        } catch (err) {
            expect(err).toBeInstanceOf(InvalidDateError);
        }
    });
});
