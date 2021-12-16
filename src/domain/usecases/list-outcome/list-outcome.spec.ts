import { InMemoryOutcomeRepository } from '../../../data/in-memory-outcome-repository';
import { Outcome } from '../../entities';
import { InvalidValueError, RequiredFieldsError } from '../../errors';
import { IListOutcomeDTO } from './list-outcome-dto';
import { ListOutcomeUseCase } from './list-outcome';

const makeSut = (repository?: InMemoryOutcomeRepository) => {
    let repo = (repository && repository.outcomeList.length > 0) 
        ? repository 
        : new InMemoryOutcomeRepository([
            new Outcome(10, 'Testing', new Date(), true),
            new Outcome(100, 'Testing 2', new Date(), true)
        ]);

    const sut = new ListOutcomeUseCase(repo);

    const idOutcome: IListOutcomeDTO = {
        id: repository?.outcomeList[0]?.getId()
    };

    const dateOutcome: IListOutcomeDTO = {
        year: 2021,
        month: 11
    };

    return {
        sut, idOutcome, dateOutcome
    };
};

describe('List outcome use case tests', () => {
    test('should throw RequiredFieldsError if no id or year/month is provided', async () => {
        const {sut} = makeSut();
        expect.assertions(1);

        try {
            await sut.execute({});
        } catch(err) {
            expect(err).toBeInstanceOf(RequiredFieldsError);
        }
    });

    test('should throw InvalidValueError if 0 month or 0 year are provided', async () => {
        const { sut, dateOutcome } = makeSut();
        expect.assertions(2);

        try {
            await sut.execute({...dateOutcome, month: 0});
        } catch(err) {
            expect(err).toBeInstanceOf(InvalidValueError);
        }

        try {
            await sut.execute({...dateOutcome, year: 0});
        } catch(err) {
            expect(err).toBeInstanceOf(InvalidValueError);
        }
    });

    test('should return an Outcome array if a date filter is provided', async () => {
        const today = new Date('2021-11-16');

        const mockRepo = [
            new Outcome(10, 'teste', today, true),
            new Outcome(30, 'teste 2', today, true),
            new Outcome(50, 'teste 3', today, true),
        ];

        const { sut } = makeSut(new InMemoryOutcomeRepository(mockRepo));

        const ret = await sut.execute({ month: 11, year: 2021});
        expect(ret).toBeInstanceOf(Array);
        expect(ret.length).toEqual(mockRepo.length);
    });

    test('should return an Outcome array if an id filter is provided', async () => {
        const today = new Date();
        const mockRepo = [
            new Outcome(10, 'teste', today, true),
            new Outcome(30, 'teste 2', today, true),
            new Outcome(50, 'teste 3', today, true),
        ];

        const { sut } = makeSut(new InMemoryOutcomeRepository(mockRepo));

        const ret = await sut.execute({id: mockRepo[0].getId()});
        expect(ret).toBeInstanceOf(Array);
        expect(ret.length).toEqual(1);
        expect(ret[0].getId()).toEqual(mockRepo[0].getId());
    });
});
