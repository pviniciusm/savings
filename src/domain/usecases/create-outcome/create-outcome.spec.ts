import { Outcome } from '../../entities/outcome';
import { InvalidDescriptionError, InvalidValueError } from '../../errors';
import {ICreateOutcomeDTO} from './create-outcome-dto';
import {InMemoryOutcomeRepository} from '../../../data/in-memory-outcome-repository';
import { addDaysToDate } from '../../infra/add-days-to-date';
import {CreateOutcomeUseCase} from './create-outcome';

const makeSut = () => {
    const sut = new CreateOutcomeUseCase(new InMemoryOutcomeRepository());
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const okOutcome: ICreateOutcomeDTO = {
        value: 20,
        description: 'Purchase at Zaffari',
        date: yesterday,
        paid: false
    };

    return { sut, okOutcome };
};

describe('create outcome use case tests', () => {
    test('should throw InvalidValueError if value is less than 1', async () => {
        const { sut, okOutcome } = makeSut();
        expect.assertions(1);

        try {
            let outcome: ICreateOutcomeDTO = { ...okOutcome, value: 0 };
            await sut.execute(outcome);
        } catch(err) {
            expect(err).toBeInstanceOf(InvalidValueError);
        }
    });

    test('should return created income object if all provided data is ok', async () => {
        const { sut, okOutcome } = makeSut();

        let income: ICreateOutcomeDTO = { ...okOutcome };
        let createdOutcome: Outcome = await sut.execute(income);
        expect(createdOutcome).not.toBeNull();
        expect(createdOutcome).toBeInstanceOf(Outcome);
        expect(createdOutcome.description).toEqual(income.description);
    });

    test('should return created income object if all provided data is ok and date is today', async () => {
        const { sut, okOutcome } = makeSut();

        let income: ICreateOutcomeDTO = { ...okOutcome, date: new Date() };
        let createdOutcome: Outcome = await sut.execute(income);
        expect(createdOutcome).not.toBeNull();
        expect(createdOutcome).toBeInstanceOf(Outcome);
        expect(createdOutcome.description).toEqual(income.description);
    });

    test('should return created income object if all provided data is ok and date is one year ago', async () => {
        const { sut, okOutcome } = makeSut();

        let income: ICreateOutcomeDTO = { ...okOutcome, date: addDaysToDate(new Date(), -365) };
        let createdOutcome: Outcome = await sut.execute(income);
        expect(createdOutcome).not.toBeNull();
        expect(createdOutcome).toBeInstanceOf(Outcome);
        expect(createdOutcome.description).toEqual(income.description);
    });
});
