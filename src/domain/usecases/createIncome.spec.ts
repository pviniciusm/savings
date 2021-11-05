import { CreateIncomeUseCase } from './createIncome';

const makeSut = () => {
    const sut = new CreateIncomeUseCase();
    const okIncome = {
        value: 20,
        description: 'Purchase at Zaffari',
        date: new Date('2021-09-06'),
        paid: false
    };

    return { sut, okIncome };
};

describe('create income use case tests', () => {
    test('should throw Error if value is less than 1', async () => {
        const { sut, okIncome } = makeSut();
        expect.assertions(1);

        let income = { ...okIncome, value: 0 };
        sut.execute(income.value, income.description, income.date, income.paid).catch((err) => {
            expect(err).toBeInstanceOf(Error);
        });

    });
});
